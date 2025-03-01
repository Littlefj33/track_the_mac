// app/api/scrape/route.ts
import { NextResponse } from "next/server";

export async function GET() {
	// Simulated scraped data; replace with real scraping logic using Axios and Cheerio as needed.
	const data = {
		events: {
			"Friday Track": [
				{ team: "Team A", projectedPoints: 10 },
				{ team: "Team B", projectedPoints: 8 },
			],
			"Friday Field": [
				{ team: "Team A", projectedPoints: 12 },
				{ team: "Team B", projectedPoints: 7 },
			],
			"Saturday Track": [
				{ team: "Team A", projectedPoints: 9 },
				{ team: "Team B", projectedPoints: 11 },
			],
			"Saturday Field": [
				{ team: "Team A", projectedPoints: 10 },
				{ team: "Team B", projectedPoints: 10 },
			],
		},
	};

	return NextResponse.json(data);
}
