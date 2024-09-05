import { Component, OnInit } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {
  private readonly API_KEY = "AIzaSyCDjvlJPxyoiPHTkHzrlRzd2jXHEWyHQUc";
  private genAI: GoogleGenerativeAI;
  res: any = "Loading...";
  insights: any[] = [];

  // Define the expected response type (resType) to enforce consistency
  private readonly resType = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "insights": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "category": { "type": "string" },
            "insight": { "type": "string" }
          },
          "required": ["category", "insight"]
        }
      },
      "general": { "type": "string" }
    },
    "required": ["insights"]
  };

  constructor() {
    this.genAI = new GoogleGenerativeAI(this.API_KEY);
  }

  async ngOnInit(): Promise<void> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const data = {
      emissions: {
        categories: [
          { categoryName: "Electricity", totalEmissionsKgCO2e: 1200, units: "kWh", details: { householdUse: 1000, renewableSources: 200 } },
          { categoryName: "Transport", totalEmissionsKgCO2e: 850, units: "km", details: { car: 500, publicTransport: 200, flights: 150 } },
          { categoryName: "Waste", totalEmissionsKgCO2e: 400, units: "kg", details: { recyclableWaste: 150, nonRecyclableWaste: 250 } },
          { categoryName: "Dietary Habits", totalEmissionsKgCO2e: 600, units: "meals", details: { meat: 350, dairy: 150, other: 100 } },
          { categoryName: "LPG", totalEmissionsKgCO2e: 300, units: "kg", details: { domesticCooking: 300 } },
          { categoryName: "Water Usage", totalEmissionsKgCO2e: 250, units: "liters", details: { lawn: 150, household: 100 } }
        ]
      }
    };

    // Build the prompt using the data and expected response structure (resType)
    const prompt = `
      Analyze the following carbon emission data in detail and provide insights.provide lengthy insights
      Format the response according to the following JSON schema without sending the schema itself:
      ${JSON.stringify(data)}.
      Ensure that the response follows this format: ${JSON.stringify(this.resType)}
    `;

    try {
      const result = await model.generateContent(prompt);
      let textResponse = await result.response.text();

      // Clean up the response if it includes unwanted text or symbols
      textResponse = textResponse.replace(/```/g, '').replace("json", '').trim();
      
      // Parse the response into JSON
      this.res = JSON.parse(textResponse);

      // Validate and check if the response matches the expected structure
      if (this.res && this.res.insights) {
        this.insights = this.res.insights;
      } else {
        throw new Error("Invalid response format");
      }

      console.log(this.res);
    } catch (error) {
      console.error("Error generating content or invalid response format:", error);
    }
  }
}
