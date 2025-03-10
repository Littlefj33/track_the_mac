import React, { useState } from "react";

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
	status: string;
}

interface EventPointTrackerProps {
	events_men: EventData[];
	events_women: EventData[];
}

const EventPointTracker: React.FC<EventPointTrackerProps> = ({ events_men, events_women }) => {
	const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
	const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
	const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
	const [showEventDropdown, setShowEventDropdown] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState<string>("");
	const [showStatusDropdown, setShowStatusDropdown] = useState(false);
	const [collegeSearch, setCollegeSearch] = useState("");
	const [eventSearch, setEventSearch] = useState("");

	const teamNames: string[] = [
		"Albright",
		"Alvernia",
		"Arcadia",
		"DeSales",
		"Delaware Valley",
		"Eastern",
		"FDU-Florham",
		"Hood",
		"King's (Pa.)",
		"Lebanon Valley",
		"Lycoming",
		"Messiah",
		"Misericordia",
		"Stevens",
		"Stevenson",
		"Widener",
		"York (Pa.)",
	];

	const handleCollegeChange = (team: string) => {
		setSelectedColleges((prevSelected) => (prevSelected.includes(team) ? prevSelected.filter((t) => t !== team) : [...prevSelected, team]));
	};

	const handleEventChange = (eventName: string) => {
		setSelectedEvents((prevSelected) => (prevSelected.includes(eventName) ? prevSelected.filter((e) => e !== eventName) : [...prevSelected, eventName]));
	};

	const filterEvents = (events: EventData[]) => {
		return events.filter(
			(event) =>
				(selectedEvents.length === 0 || selectedEvents.includes(event.eventName)) &&
				(selectedColleges.length === 0 || event.colleges.some((college) => selectedColleges.includes(college.team))) &&
				(selectedStatus === "" || event.status === selectedStatus)
		);
	};

	const calculateTotalScores = (events: EventData[]) => {
		const scores: { [key: string]: number } = {};
		events.forEach((event) => {
			event.colleges.forEach((college) => {
				if (!scores[college.team]) {
					scores[college.team] = 0;
				}
				scores[college.team] += college.actual > -1 ? college.actual : college.projected;
			});
		});
		return scores;
	};

	const renderLeaderboard = (scores: { [key: string]: number }) => {
		const sortedTeams = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
		const filteredTeams = sortedTeams.filter((team) => selectedColleges.length === 0 || selectedColleges.includes(team));
		return (
			<div className="mt-4">
				<table className="min-w-full bg-white border-black border-2">
					<thead>
						<tr className="bg-gray-200">
							<th className="py-2 px-4 border border-black">Place</th>
							<th className="py-2 px-4 border border-black">Team</th>
							<th className="py-2 px-4 border border-black">Total Score</th>
						</tr>
					</thead>
					<tbody>
						{filteredTeams.map((team, index) => (
							<tr key={index} className="text-center">
								<td className="py-2 px-4 border border-black">{sortedTeams.indexOf(team) + 1}</td>
								<td className="py-2 px-4 border border-black">{team}</td>
								<td className="py-2 px-4 border border-black">{scores[team]}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	};

	const menScores = calculateTotalScores(events_men);
	const womenScores = calculateTotalScores(events_women);

	const filteredTeamNames = teamNames.filter((team) => team.toLowerCase().includes(collegeSearch.toLowerCase()));
	const filteredEventNames = [...new Set([...events_men, ...events_women].map((event) => event.eventName))].filter((eventName) => eventName.toLowerCase().includes(eventSearch.toLowerCase()));

	return (
		<div className="overflow-x-auto text-black space-y-5 bg-white">
			<h1 className="text-3xl font-bold text-center">Track The MAC</h1>
			<h3 className="text-xl text-center">Refresh site to update data</h3>

			<div className="flex flex-col sm:flex-row justify-start space-y-5 sm:space-y-0 sm:space-x-5">
				<div>
					<button onClick={() => setShowCollegeDropdown(!showCollegeDropdown)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-black border sm:text-base rounded-md ">
						Filter by College
					</button>
					{showCollegeDropdown && (
						<div className="absolute mt-1 w-fit border border-black rounded-md bg-white shadow-lg z-50 max-h-60 overflow-y-auto">
							<div className="py-1">
								<input type="text" placeholder="Search Colleges" value={collegeSearch} onChange={(e) => setCollegeSearch(e.target.value)} className="w-full px-4 py-2 border-b" />
								<label className="flex items-center px-4 py-2 border-b">
									<input type="checkbox" checked={selectedColleges.length === teamNames.length} onChange={() => setSelectedColleges(selectedColleges.length === teamNames.length ? [] : teamNames)} className="form-checkbox" />
									<span className="ml-2">Select All</span>
								</label>
								{filteredTeamNames.map((team, index) => (
									<label key={index} className="flex items-center px-4 py-2 border-b">
										<input type="checkbox" checked={selectedColleges.includes(team)} onChange={() => handleCollegeChange(team)} className="form-checkbox" />
										<span className="ml-2">{team}</span>
									</label>
								))}
							</div>
						</div>
					)}
				</div>
				<div>
					<button onClick={() => setShowEventDropdown(!showEventDropdown)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-black border sm:text-base rounded-md">
						Filter by Event
					</button>
					{showEventDropdown && (
						<div className="absolute mt-1 w-fit rounded-md bg-white border shadow-lg z-50 max-h-60 overflow-y-auto">
							<div className="py-1">
								<input type="text" placeholder="Search Events" value={eventSearch} onChange={(e) => setEventSearch(e.target.value)} className="w-full px-4 py-2 border-b" />
								<label className="flex items-center px-4 py-2 border-b">
									<input
										type="checkbox"
										checked={selectedEvents.length === [...new Set([...events_men, ...events_women].map((event) => event.eventName))].length}
										onChange={() =>
											setSelectedEvents(
												selectedEvents.length === [...new Set([...events_men, ...events_women].map((event) => event.eventName))].length ? [] : [...new Set([...events_men, ...events_women].map((event) => event.eventName))]
											)
										}
										className="form-checkbox"
									/>
									<span className="ml-2">Select All</span>
								</label>
								{filteredEventNames.map((eventName, index) => (
									<label key={index} className="flex items-center px-4 py-2 border-b">
										<input type="checkbox" checked={selectedEvents.includes(eventName)} onChange={() => handleEventChange(eventName)} className="form-checkbox" />
										<span className="ml-2">{eventName}</span>
									</label>
								))}
							</div>
						</div>
					)}
				</div>
				<div>
					<button onClick={() => setShowStatusDropdown(!showStatusDropdown)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-black border sm:text-base rounded-md">
						Filter by Status
					</button>
					{showStatusDropdown && (
						<div className="absolute mt-1 w-fit rounded-md bg-white border shadow-lg z-50 max-h-60 overflow-y-auto">
							<div className="py-1">
								<label className="flex items-center px-4 py-2 border-b">
									<input type="radio" name="status" value="" checked={selectedStatus === ""} onChange={() => setSelectedStatus("")} className="form-radio" />
									<span className="ml-2">All</span>
								</label>
								<label className="flex items-center px-4 py-2 border-b">
									<input type="radio" name="status" value="Finals" checked={selectedStatus === "Finals"} onChange={() => setSelectedStatus("Finals")} className="form-radio" />
									<span className="ml-2">Finals</span>
								</label>
								<label className="flex items-center px-4 py-2 border-b">
									<input type="radio" name="status" value="Prelims" checked={selectedStatus === "Prelims"} onChange={() => setSelectedStatus("Prelims")} className="form-radio" />
									<span className="ml-2">Prelims & Not Completed</span>
								</label>
							</div>
						</div>
					)}
				</div>
			</div>

			<h2 className="text-2xl/tight font-bold text-center pt-5">Current Leaderboard</h2>
			<h2 className="text-xl/tight text-center">Contains live projected results</h2>

			<div className="flex flex-col md:flex-row justify-center space-y-5 md:space-y-0 md:space-x-5">
				<div className="w-full md:w-1/2">
					<h3 className="text-lg font-bold text-center">Men</h3>
					{renderLeaderboard(menScores)}
				</div>
				<div className="w-full md:w-1/2">
					<h3 className="text-lg font-bold text-center">Women</h3>
					{renderLeaderboard(womenScores)}
				</div>
			</div>

			<h2 className="text-2xl font-bold text-center pt-5">Results (Projected & Actual)</h2>
			<h2 className="text-xl font-bold text-center">Men&apos;s</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border-black border-2">
					<thead>
						<tr className="bg-gray-200 top-0 z-20">
							<th rowSpan={2} className="py-2 px-4 border-b-2 sticky border-r-2 left-0 bg-blue-200 border-black z-30">
								Event Name
							</th>
							{teamNames.map(
								(team, index) =>
									(selectedColleges.length === 0 || selectedColleges.includes(team)) && (
										<th key={index} colSpan={4} className="py-2 px-4 border-b-2 border-r-2 border-black bg-green-200">
											{team}
										</th>
									)
							)}
						</tr>
						<tr className="bg-gray-200 top-10 z-10">
							{teamNames.map(
								(team, index) =>
									(selectedColleges.length === 0 || selectedColleges.includes(team)) && (
										<React.Fragment key={index}>
											<th className="py-2 px-2 border-b-2 border-r-1 border-black bg-gray-100">Proj</th>
											<th className="py-2 px-0.5 border-b-2 border-r-1 border-black bg-gray-300">Actual</th>
											<th className="py-2 px-3 border-b-2 border-r-1 border-black bg-gray-100">Diff</th>
											<th className="py-2 px-1 border-b-2 border-r-2 border-black bg-gray-300">Score</th>
										</React.Fragment>
									)
							)}
						</tr>
					</thead>
					<tbody>
						{filterEvents(events_men).map((event, eventIndex) => (
							<tr key={eventIndex} className="text-center">
								<td className="py-2 px-4 text-nowrap border-b-2 border-r-2 sticky left-0 bg-blue-200 z-10 border-black">{event.eventName}</td>
								{teamNames.map((team, teamIndex) => {
									const college = event.colleges.find((college) => college.team === team);
									return (
										(selectedColleges.length === 0 || selectedColleges.includes(team)) && (
											<React.Fragment key={teamIndex}>
												<td className="py-2 px-4 border-b-2 border-1 border-black bg-gray-100">{college?.projected ?? "-"}</td>
												<td className="py-2 px-4 border-b-2 border-1 border-black bg-gray-300">{college?.actual != null && college.actual > -1 ? college.actual : "-"}</td>
												<td className="py-2 px-4 border-b-2 border-1 border-black bg-gray-100">{college?.difference != null && college.actual > -1 ? college.difference : "-"}</td>
												<td className="py-2 px-4 border-b-2 border-r-2 border-1 border-black bg-gray-300">{college?.score ?? "-"}</td>
											</React.Fragment>
										)
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<h2 className="text-xl font-bold text-center pt-5">Women&apos;s</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border-black border-2">
					<thead>
						<tr className="bg-gray-200 top-0 z-20">
							<th rowSpan={2} className="py-2 px-4 border-b-2 sticky border-r-2 left-0 bg-blue-200 border-black z-30">
								Event Name
							</th>
							{teamNames.map(
								(team, index) =>
									(selectedColleges.length === 0 || selectedColleges.includes(team)) && (
										<th key={index} colSpan={4} className="py-2 px-4 border-b-2 border-r-2 border-black bg-green-200">
											{team}
										</th>
									)
							)}
						</tr>
						<tr className="bg-gray-200 top-10 z-10">
							{teamNames.map(
								(team, index) =>
									(selectedColleges.length === 0 || selectedColleges.includes(team)) && (
										<React.Fragment key={index}>
											<th className="py-2 px-2 border-b-2 border-r-1 border-black bg-gray-100">Proj</th>
											<th className="py-2 px-0.5 border-b-2 border-r-1 border-black bg-gray-300">Actual</th>
											<th className="py-2 px-3 border-b-2 border-r-1 border-black bg-gray-100">Diff</th>
											<th className="py-2 px-1 border-b-2 border-r-2 border-black bg-gray-300">Score</th>
										</React.Fragment>
									)
							)}
						</tr>
					</thead>
					<tbody>
						{filterEvents(events_women).map((event, eventIndex) => (
							<tr key={eventIndex} className="text-center">
								<td className="py-2 px-4 text-nowrap border-b-2 border-r-2 sticky left-0 bg-blue-200 z-10 border-black">{event.eventName}</td>
								{teamNames.map((team, teamIndex) => {
									const college = event.colleges.find((college) => college.team === team);
									return (
										(selectedColleges.length === 0 || selectedColleges.includes(team)) && (
											<React.Fragment key={teamIndex}>
												<td className="py-2 px-4 border-b-2 border-1 border-black bg-gray-100">{college?.projected ?? "-"}</td>
												<td className="py-2 px-4 border-b-2 border-1 border-black bg-gray-300">{college?.actual != null && college.actual > -1 ? college.actual : "-"}</td>
												<td className="py-2 px-4 border-b-2 border-1 border-black bg-gray-100">{college?.difference != null && college.actual > -1 ? college.difference : "-"}</td>
												<td className="py-2 px-4 border-b-2 border-r-2 border-1 border-black bg-gray-300">{college?.score ?? "-"}</td>
											</React.Fragment>
										)
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default EventPointTracker;
