"use client";
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
		return events.filter((event) => (selectedEvents.length === 0 || selectedEvents.includes(event.eventName)) && (selectedColleges.length === 0 || event.colleges.some((college) => selectedColleges.includes(college.team))));
	};

	return (
		<div className="overflow-x-auto text-black space-y-5 bg-white">
			<h1 className="text-2xl font-bold text-start">Event Point Tracker</h1>

			<div className="flex space-x-4">
				<div>
					<button onClick={() => setShowCollegeDropdown(!showCollegeDropdown)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-black border sm:text-base rounded-md">
						Filter by College
					</button>
					{showCollegeDropdown && (
						<div className="absolute mt-1 w-fit border border-black rounded-md bg-white shadow-lg z-50 max-h-60 overflow-y-auto">
							<div className="py-1">
								<label className="flex items-center px-4 py-2 border-b">
									<input type="checkbox" checked={selectedColleges.length === teamNames.length} onChange={() => setSelectedColleges(selectedColleges.length === teamNames.length ? [] : teamNames)} className="form-checkbox" />
									<span className="ml-2">Select All</span>
								</label>
								{teamNames.map((team, index) => (
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
								{[...new Set([...events_men, ...events_women].map((event) => event.eventName))].map((eventName, index) => (
									<label key={index} className="flex items-center px-4 py-2 border-b">
										<input type="checkbox" checked={selectedEvents.includes(eventName)} onChange={() => handleEventChange(eventName)} className="form-checkbox" />
										<span className="ml-2">{eventName}</span>
									</label>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<h2 className="text-xl font-bold text-start">Men's</h2>
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
												<td className="py-2 px-4 border-b-2 border-1 border-black bg-gray-300">{college?.actual ?? "-"}</td>
												<td className="py-2 px-4 border-b-2 border-1 border-black bg-gray-100">{college?.difference ?? "-"}</td>
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

			<h2 className="text-xl font-bold text-start">Women's</h2>
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
												<td className="py-2 px-4 border-b-2 border-1 border-black bg-gray-300">{college?.actual ?? "-"}</td>
												<td className="py-2 px-4 border-b-2 border-1 border-black bg-gray-100">{college?.difference ?? "-"}</td>
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
