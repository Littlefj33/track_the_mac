const teamNames: string[] = ["Albright", "Alvernia", "Arcadia", "DeSales", "Delaware Valley", "Eastern", "FDU-Florham", "Hood", "King's (Pa.)", "Lebanon Valley", "Lycoming", "Messiah", "Misericordia", "Stevens", "Stevenson", "Widener", "York (Pa.)"];
const performance_list_predictions = [
	{ event_name: "#5 Men's 60 Meters Performance List", scoring: { Eastern: 15, "Lebanon Valley": 8, Misericordia: 6, Arcadia: 5, "King's (Pa.)": 3, "York (Pa.)": 2 } },
	{ event_name: "#6 Women's 60 Meters Performance List", scoring: { Widener: 18, Messiah: 6, "Lebanon Valley": 4.5, DeSales: 4.5, "King's (Pa.)": 3, "Delaware Valley": 2, Alvernia: 1 } },
	{ event_name: "#22 Men's 200 Meters Performance List", scoring: { Widener: 10, Misericordia: 9, "Lebanon Valley": 6, Stevenson: 5, Eastern: 4, Arcadia: 3, "King's (Pa.)": 2 } },
	{ event_name: "#23 Women's 200 Meters Performance List", scoring: { Widener: 16, Messiah: 11, "Lebanon Valley": 7, Stevens: 4, "King's (Pa.)": 1 } },
	{ event_name: "#18 Men's 400 Meters Performance List", scoring: { Widener: 10, "King's (Pa.)": 10, Misericordia: 6, Stevenson: 9, "Lebanon Valley": 3, Alvernia: 1 } },
	{ event_name: "#19 Women's 400 Meters Performance List", scoring: { Stevens: 11, Messiah: 8, "FDU-Florham": 6, "York (Pa.)": 5, "King's (Pa.)": 4, Eastern: 3, DeSales: 2 } },
	{ event_name: "#20 Men's 800 Meters Performance List", scoring: { Stevens: 10, Messiah: 12, "Lebanon Valley": 6, DeSales: 5, "King's (Pa.)": 3, Eastern: 2, Alvernia: 1 } },
	{ event_name: "#21 Women's 800 Meters Performance List", scoring: { Eastern: 10, Misericordia: 8, Messiah: 8, DeSales: 5, Stevens: 4, "Lebanon Valley": 3, "York (Pa.)": 1 } },
	{ event_name: "#16 Men's 1 Mile Run Performance List", scoring: { "King's (Pa.)": 10, "Lebanon Valley": 13, Misericordia: 6, Eastern: 5, Messiah: 3, Stevens: 2 } },
	{ event_name: "#17 Women's 1 Mile Run Performance List", scoring: { Widener: 12, Eastern: 8, "Lebanon Valley": 10, Misericordia: 8, Stevens: 1 } },
	{ event_name: "#24 Men's 3000 Meters Performance List", scoring: { "Lebanon Valley": 25, Misericordia: 6, Stevens: 4, Messiah: 3, Widener: 1 } },
	{ event_name: "#25 Women's 3000 Meters Performance List", scoring: { Widener: 16, Misericordia: 11, DeSales: 6, "Lebanon Valley": 6 } },
	{ event_name: "#7 Men's 5000 Meters Performance List", scoring: { Widener: 13, "Lebanon Valley": 13, Messiah: 6, Stevens: 5, Misericordia: 2 } },
	{ event_name: "#8 Women's 5000 Meters Performance List", scoring: { Misericordia: 10, Widener: 12, "Lebanon Valley": 6, DeSales: 5, Messiah: 4, Hood: 2 } },
	{ event_name: "#3 Men's 60m Hurdles Performance List", scoring: { DeSales: 10, Misericordia: 8, Eastern: 8, "Lebanon Valley": 6, Stevens: 4, Arcadia: 3 } },
	{ event_name: "#4 Women's 60m Hurdles Performance List", scoring: { Widener: 16, Messiah: 8, "Lebanon Valley": 7, Misericordia: 3.5, "King's (Pa.)": 3.5, Alvernia: 1 } },
	{ event_name: "#9 Men's 4 x 200m Relay Performance List", scoring: { Misericordia: 10, Eastern: 8, Arcadia: 6, Widener: 5, "Lebanon Valley": 4, Alvernia: 3, "York (Pa.)": 2, "Delaware Valley": 1 } },
	{ event_name: "#10 Women's 4 x 200m Relay Performance List", scoring: { Widener: 10, "Lebanon Valley": 8, Eastern: 6, Messiah: 5, Misericordia: 4, Stevens: 3, Arcadia: 2, DeSales: 1 } },
	{ event_name: "#28 Men's 4 x 400m Relay Performance List", scoring: { Misericordia: 10, "Lebanon Valley": 8, Widener: 6, Stevenson: 5, Messiah: 4, Arcadia: 3, Stevens: 2, Alvernia: 1 } },
	{ event_name: "#29 Women's 4 x 400m Relay Performance List", scoring: { Stevens: 10, "Lebanon Valley": 8, Widener: 6, Misericordia: 5, Messiah: 4, "York (Pa.)": 3, Alvernia: 2, Eastern: 1 } },
	{ event_name: "#26 Men's 4 x 800m Relay Performance List", scoring: { Messiah: 10, "York (Pa.)": 8, Eastern: 6, Alvernia: 5, Albright: 4, "Lebanon Valley": 2, Misericordia: 2, "Delaware Valley": 2 } },
	{ event_name: "#27 Women's 4 x 800m Relay Performance List", scoring: { Messiah: 10, Eastern: 8, "York (Pa.)": 6, "Lebanon Valley": 3, Widener: 3, Stevens: 3, DeSales: 3, Arcadia: 3 } },
	{ event_name: "#1 Men's 4000m DMR Performance List", scoring: { Messiah: 10, Stevens: 8, "King's (Pa.)": 6, "FDU-Florham": 5, Alvernia: 4, "Lebanon Valley": 2, Misericordia: 2, Eastern: 2 } },
	{ event_name: "#2 Women's 4000m DMR Performance List", scoring: { DeSales: 10, Messiah: 8, "Lebanon Valley": 6, Stevens: 5, Misericordia: 2.5, Eastern: 2.5, "Delaware Valley": 2.5, Widener: 2.5 } },
	{ event_name: "#35 Men's High Jump Performance List", scoring: { Messiah: 10, "York (Pa.)": 8, Eastern: 7.5, Widener: 5.5, "Lebanon Valley": 3.5, Alvernia: 3.5, Misericordia: 1 } },
	{ event_name: "#34 Women's High Jump Performance List", scoring: { Stevens: 26, "Lebanon Valley": 6.5, "King's (Pa.)": 4.5, "FDU-Florham": 2 } },
	{ event_name: "#36 Men's Pole Vault Performance List", scoring: { "Lebanon Valley": 10, "York (Pa.)": 18, Stevenson: 5, Widener: 3.5, Arcadia: 2.5 } },
	{ event_name: "#13 Women's Pole Vault Performance List", scoring: { Messiah: 10, Stevens: 8, "King's (Pa.)": 6, "Lebanon Valley": 9.5, "York (Pa.)": 4, DeSales: 1.5 } },
	{ event_name: "#14 Men's Long Jump Performance List", scoring: { Misericordia: 10, "King's (Pa.)": 8, Messiah: 6, Widener: 9, DeSales: 2.5, Arcadia: 2.5, Stevens: 1 } },
	{ event_name: "#15 Women's Long Jump Performance List", scoring: { Widener: 10, Alvernia: 8, Arcadia: 9.5, DeSales: 8.5, "Lebanon Valley": 1.5, Stevenson: 1.5 } },
	{ event_name: "#33 Men's Triple Jump Performance List", scoring: { Widener: 14, Messiah: 8, Arcadia: 6, Misericordia: 5, DeSales: 4, Eastern: 2 } },
	{ event_name: "#32 Women's Triple Jump Performance List", scoring: { Widener: 10, Alvernia: 8, Arcadia: 6, DeSales: 9, Misericordia: 3, "Lebanon Valley": 2, Eastern: 1 } },
	{ event_name: "#31 Men's Shot Put Performance List", scoring: { "York (Pa.)": 10, "FDU-Florham": 8, "Delaware Valley": 6, Messiah: 9, DeSales: 3, Misericordia: 2, Widener: 1 } },
	{ event_name: "#30 Women's Shot Put Performance List", scoring: { Widener: 10, "King's (Pa.)": 11, "FDU-Florham": 6, Arcadia: 5, Eastern: 4, Messiah: 3 } },
	{ event_name: "#12 Men's Weight Throw Performance List", scoring: { "York (Pa.)": 10, Widener: 12, Messiah: 6, Misericordia: 5, DeSales: 4, "Lebanon Valley": 2 } },
	{ event_name: "#11 Women's Weight Throw Performance List", scoring: { "King's (Pa.)": 19, Eastern: 8, Widener: 5, "Lebanon Valley": 4, "York (Pa.)": 2, Arcadia: 1 } },
	{ event_name: "#37 Men's Indoor Heptathlon Performance List", scoring: { Arcadia: 10, Stevens: 12, "Lebanon Valley": 8, Messiah: 5, Eastern: 4 } },
	{ event_name: "#38 Women's Indoor Pentathlon Performance List", scoring: { "Lebanon Valley": 12, "King's (Pa.)": 8, Eastern: 6, Stevens: 5, Arcadia: 7, "FDU-Florham": 1 } },
] as { event_name: string; scoring: { [team: string]: number } }[];

const performance_list_predictions_MEN = performance_list_predictions.filter((event) => event.event_name.includes("Men"));
const performance_list_predictions_WOMEN = performance_list_predictions.filter((event) => event.event_name.includes("Women"));

performance_list_predictions_MEN.forEach((event) => {
	event.event_name = event.event_name
		.replace(/#\d+\sMen's\s|\sPerformance List/g, "")
		.replace(" Meters", "m")
		.replace(" x ", "x")
		.replace("Relay", "");
});

performance_list_predictions_WOMEN.forEach((event) => {
	event.event_name = event.event_name
		.replace(/#\d+\sWomen's\s|\sPerformance List/g, "")
		.replace(" Meters", "m")
		.replace(" x ", "x")
		.replace("Relay", "");
});

interface CollegeData {
	team: string;
	projected: number;
	actual: number;
	difference: number;
	score: number;
}

interface EventData {
	eventName: string;
	colleges: CollegeData[];
	status: string; // Add this line
}

interface DayData {
	events_MEN: EventData[];
	events_WOMEN: EventData[];
}

const formatEventName = (eventName: string): string => {
	return eventName
		.replace(/#\d+\s(Men's|Women's)\s|\sPerformance List/g, "")
		.replace(" Meters", "m")
		.replace(" x ", "x")
		.replace("Relay", "")
		.replace("Results", "")
		.trim();
};

const fetchActualResults = async (): Promise<{ event_name: string; scoring: { [team: string]: number }; status: string }[]> => {
	// Update return type
	// const response = await fetch("http://localhost:3000/api/scrape_results"); // LOCAL
	const response = await fetch("https://track-the-mac.vercel.app/api/scrape_results"); // PROD
	const resultsArray = await response.json();

	return resultsArray.map((event: { event_name: string; scoring: { [team: string]: number }; status: string }) => ({
		// Update event type
		...event,
		event_name: formatEventName(event.event_name),
	}));
};

export const getEventData = async (): Promise<DayData> => {
	const actualResults = await fetchActualResults();

	const totalScores_MEN: { [team: string]: number } = {};
	const totalScores_WOMEN: { [team: string]: number } = {};

	// Initialize total scores
	teamNames.forEach((team) => {
		totalScores_MEN[team] = performance_list_predictions_MEN.reduce((total, event) => {
			return total + (event.scoring[team] || 0);
		}, 0);

		totalScores_WOMEN[team] = performance_list_predictions_WOMEN.reduce((total, event) => {
			return total + (event.scoring[team] || 0);
		}, 0);
	});

	// Calculate scores for each event
	const events_MEN: EventData[] = performance_list_predictions_MEN.map((event) => {
		event.event_name = formatEventName(event.event_name);
		const actualEvent = actualResults.find((result) => result.event_name === event.event_name);
		const colleges: CollegeData[] = teamNames.map((team) => {
			const projected = event.scoring[team] || 0;
			const actual = actualEvent ? actualEvent.scoring[team] || 0 : -1;
			const difference = actual - projected;
			if (actual > -1) {
				totalScores_MEN[team] += difference;
			}
			return {
				team,
				projected,
				actual,
				difference,
				score: totalScores_MEN[team],
			};
		});

		return {
			eventName: event.event_name,
			colleges,
			status: actualEvent ? actualEvent.status : "Prelims", // Add status
		};
	});

	const events_WOMEN: EventData[] = performance_list_predictions_WOMEN.map((event) => {
		event.event_name = formatEventName(event.event_name);
		const actualEvent = actualResults.find((result) => formatEventName(result.event_name) === event.event_name);
		const colleges: CollegeData[] = teamNames.map((team) => {
			const projected = event.scoring[team] || 0;
			const actual = actualEvent ? actualEvent.scoring[team] || 0 : -1;
			const difference = actual - projected;
			if (actual > -1) {
				totalScores_WOMEN[team] += difference;
			}
			return {
				team,
				projected,
				actual,
				difference,
				score: totalScores_WOMEN[team],
			};
		});

		return {
			eventName: event.event_name,
			colleges,
			status: actualEvent ? actualEvent.status : "Prelims", // Add status
		};
	});

	return {
		events_MEN,
		events_WOMEN,
	};
};
