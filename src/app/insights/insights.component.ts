import { Component, OnInit } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FactorsService } from '../factors.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css'],
})
export class InsightsComponent implements OnInit {
  private readonly API_KEY = 'AIzaSyCDjvlJPxyoiPHTkHzrlRzd2jXHEWyHQUc';
  private genAI: GoogleGenerativeAI;
  res: any = 'Loading...';
  insights: any = [];
  loading: boolean = true; // Add loading flag to track data fetching
  error: boolean = false;
  selectedMonth!: any;
  selectedYear!: any;
  fieldImg: any = {
    electricity: 'assets/lightning.png',
    waste: 'assets/waste.png',
    water: 'assets/water.png',
    dietary_habits: 'assets/diet.png',
    fuel_sources: 'assets/lpg.png',
    transport: 'assets/train.png',
  };

  // Define the expected response type (resType) to enforce consistency
  private readonly resType = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: {
      insights: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            category: { type: 'string' },
            insight: { type: 'string' },
            jsonfield: {
              type: 'string',
              enum: [
                'electricity',
                'waste',
                'water',
                'dietary_habits',
                'fuel_sources',
                'transport',
              ],
            },
          },
          required: ['category', 'insight'],
        },
      },
      general: { type: 'string' },
    },
    required: ['insights'],
  };

  constructor(private service: FactorsService, private route: ActivatedRoute) {
    this.genAI = new GoogleGenerativeAI(this.API_KEY);
    this.selectedMonth = this.route.snapshot.paramMap.get('month');
    this.selectedYear = this.route.snapshot.paramMap.get('year');
  }

  async ngOnInit(): Promise<void> {
    this.fetchCurrentMonthDataAndGenerateInsights();
  }

  fetchCurrentMonthDataAndGenerateInsights(): void {
    if (this.selectedMonth && this.selectedYear) {
      this.service
        .fetchMonthData(this.selectedYear, this.selectedMonth)
        .subscribe({
          next: async (response) => {
            if (response) {
              await this.generateInsights(response);
              this.loading = false; // Set loading to false after fetching data
            }
          },
          error: (err) => {
            this.error = true;
            console.error('Error fetching current month data:', err);
          },
          complete: () => {},
        });
    }
  }

  async generateInsights(response: any): Promise<void> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Analyze the following carbon emission data in detail and provide insights. Provide insights in a way that insight from each category has same number of words or length.
      Make sure to combine public transport and personal transport into one (also return jsonfield for the combo as either private_transpot or public_transport not both), but not too lengthy
      Also insight.category name should be without underscore yk, not exactly like the jsonfield.
      Format the response according to the following JSON schema without sending the schema itself:
      ${JSON.stringify(response)}.
      Ensure that the response follows this format: ${JSON.stringify(
        this.resType
      )}
    `;

    try {
      const result = await model.generateContent(prompt);
      let textResponse = await result.response.text();

      // Clean up the response if it includes unwanted text or symbols
      textResponse = textResponse
        .replace(/```/g, '')
        .replace('json', '')
        .trim();

      // Parse the response into JSON
      this.res = JSON.parse(textResponse);

      // Validate and check if the response matches the expected structure
      if (this.res && this.res.insights) {
        this.insights = this.res.insights;
      } else {
        throw new Error('Invalid response format');
      }

      //console.log(this.res);
    } catch (error) {
      this.error = true;
      console.error(
        'Error generating content or invalid response format:',
        error
      );
    }
  }
}
