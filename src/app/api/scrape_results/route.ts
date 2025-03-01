import { NextResponse } from "next/server";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function GET() {
	const baseUrl = "http://results.tfmeetpro.com/MACFAT_LLC/2025_Middle_Atlantic_Conference_Indoor_Championships/results_";
	const resultsArray: { event_name: string; status: string; scoring: { [team: string]: number } }[] = [];
	const scores = [10, 8, 6, 5, 4, 3, 2, 1];

	for (let i = 1; i <= 38; i++) {
		const url = `${baseUrl}${i}.html`;
		try {
			const response = await fetch(url);
			if (response.status === 404) {
				continue; // Skip if the results have not been posted yet
			}
			const html = await response.text();
			const $ = cheerio.load(html);

			const event_name = $("h3.event-results-hdr").first().text().trim();
			const status = $("h4.round-results-hdr").first().text().trim();
			const results: { [team: string]: number } = {};

			const rows = $(".results-table.table.table-striped.table-bordered.table-condensed > tbody > tr").slice(0, 8);
			if (rows.length === 0) {
				continue; // Skip if there are no table rows
			}

			for (let j = 0; j < rows.length; j++) {
				const currentRow = $(rows[j]);
				const currentTeam = currentRow.find(".team").text().trim();
				let points = 0;

				if (event_name.includes("Heptathlon") || event_name.includes("Pentathlon")) {
					// Use PL column for Heptathlon and Pentathlon events
					const currentPlace = parseInt(currentRow.find(".place").text().trim(), 10);
					points = scores[currentPlace - 1] || 0;
				} else if (currentRow.find(".points").length > 0 && currentRow.find(".points").text().trim() !== "") {
					// Table with Pts column and it has data
					points = parseFloat(currentRow.find(".points").text().trim());
				} else {
					// Table without Pts column or Pts column is empty, use PL column
					const currentPlace = parseInt(currentRow.find(".place").text().trim(), 10);
					points = scores[currentPlace - 1] || 0;
				}

				if (results[currentTeam]) {
					results[currentTeam] += points;
				} else {
					results[currentTeam] = points;
				}
			}

			resultsArray.push({ event_name, status, scoring: results });
		} catch {
			console.error(`Error fetching data for event ${i}:`);
		}
	}

	return NextResponse.json(resultsArray);
}
