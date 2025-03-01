import { NextResponse } from "next/server";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function GET() {
	const baseUrl = "http://results.tfmeetpro.com/MACFAT_LLC/2025_Middle_Atlantic_Conference_Indoor_Championships/performance_list_";
	const resultsArray: { event_name: string; scoring: { [team: string]: number } }[] = [];
	const scores = [10, 8, 6, 5, 4, 3, 2, 1];

	for (let i = 1; i <= 38; i++) {
		const url = `${baseUrl}${i}.html`;
		const response = await fetch(url);
		const html = await response.text();
		const $ = cheerio.load(html);

		const event_name = $("h3.event-performance-list-hdr").text().trim();
		const results: { [team: string]: number } = {};

		const rows = $(".performance-list-table tbody tr").slice(0, 8);
		let currentScoreIndex = 0;

		for (let j = 0; j < rows.length; j++) {
			const currentRow = $(rows[j]);
			const currentSeed = currentRow.find(".seed").text().trim();
			const currentTeam = currentRow.find(".team").text().trim();

			let tieCount = 1;
			let totalPoints = scores[currentScoreIndex];
			const tiedTeams = [currentTeam];

			// Check for ties
			for (let k = j + 1; k < rows.length; k++) {
				const nextRow = $(rows[k]);
				const nextSeed = nextRow.find(".seed").text().trim();

				if (currentSeed === nextSeed) {
					tieCount++;
					tiedTeams.push(nextRow.find(".team").text().trim());
					totalPoints += scores[currentScoreIndex + tieCount - 1]; // Add the score for the tied position
				} else {
					break;
				}
			}

			const pointsPerAthlete = totalPoints / tieCount;

			for (let k = 0; k < tieCount; k++) {
				const curTeam = tiedTeams[k];
				if (results[curTeam]) {
					results[curTeam] += pointsPerAthlete;
				} else {
					results[curTeam] = pointsPerAthlete;
				}
			}

			j += tieCount - 1;
			currentScoreIndex += tieCount;
		}

		resultsArray.push({ event_name, scoring: results });
	}

	return NextResponse.json(resultsArray);
}
