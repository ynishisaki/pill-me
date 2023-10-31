import { recordType } from "~/types";

// "2023-01-01" ~ "2023-04-30": 120日間
const dateList = [
	"2023-04-30",
	"2023-04-29",
	"2023-04-28",
	"2023-04-27",
	"2023-04-26",
	"2023-04-25",
	"2023-04-24",
	"2023-04-23",
	"2023-04-22",
	"2023-04-21",
	"2023-04-20",
	"2023-04-19",
	"2023-04-18",
	"2023-04-17",
	"2023-04-16",
	"2023-04-15",
	"2023-04-14",
	"2023-04-13",
	"2023-04-12",
	"2023-04-11",
	"2023-04-10",
	"2023-04-09",
	"2023-04-08",
	"2023-04-07",
	"2023-04-06",
	"2023-04-05",
	"2023-04-04",
	"2023-04-03",
	"2023-04-02",
	"2023-04-01",
	"2023-03-31",
	"2023-03-30",
	"2023-03-29",
	"2023-03-28",
	"2023-03-27",
	"2023-03-26",
	"2023-03-25",
	"2023-03-24",
	"2023-03-23",
	"2023-03-22",
	"2023-03-21",
	"2023-03-20",
	"2023-03-19",
	"2023-03-18",
	"2023-03-17",
	"2023-03-16",
	"2023-03-15",
	"2023-03-14",
	"2023-03-13",
	"2023-03-12",
	"2023-03-11",
	"2023-03-10",
	"2023-03-09",
	"2023-03-08",
	"2023-03-07",
	"2023-03-06",
	"2023-03-05",
	"2023-03-04",
	"2023-03-03",
	"2023-03-02",
	"2023-03-01",
	"2023-02-28",
	"2023-02-27",
	"2023-02-26",
	"2023-02-25",
	"2023-02-24",
	"2023-02-23",
	"2023-02-22",
	"2023-02-21",
	"2023-02-20",
	"2023-02-19",
	"2023-02-18",
	"2023-02-17",
	"2023-02-16",
	"2023-02-15",
	"2023-02-14",
	"2023-02-13",
	"2023-02-12",
	"2023-02-11",
	"2023-02-10",
	"2023-02-09",
	"2023-02-08",
	"2023-02-07",
	"2023-02-06",
	"2023-02-05",
	"2023-02-04",
	"2023-02-03",
	"2023-02-02",
	"2023-02-01",
	"2023-01-31",
	"2023-01-30",
	"2023-01-29",
	"2023-01-28",
	"2023-01-27",
	"2023-01-26",
	"2023-01-25",
	"2023-01-24",
	"2023-01-23",
	"2023-01-22",
	"2023-01-21",
	"2023-01-20",
	"2023-01-19",
	"2023-01-18",
	"2023-01-17",
	"2023-01-16",
	"2023-01-15",
	"2023-01-14",
	"2023-01-13",
	"2023-01-12",
	"2023-01-11",
	"2023-01-10",
	"2023-01-09",
	"2023-01-08",
	"2023-01-07",
	"2023-01-06",
	"2023-01-05",
	"2023-01-04",
	"2023-01-03",
	"2023-01-02",
	"2023-01-01",
];

// 120日以上連続服用で休薬する
export const testDataThree: recordType = {
	dailyRecord: [
		{
			date: "2023-05-01",
			tookMedicine: false,
			haveBleeding: false,
			isRestPeriod: false,
		},
		...dateList.map((date) => {
			return {
				date,
				tookMedicine: true,
				haveBleeding: false,
				isRestPeriod: false,
			};
		}),
	],
	initialSheetSettings: {
		minConteniousTakingDays: 24,
		maxConteniousTakingDays: 120,
		conteniousBleeingDaysForRest: 3,
		stopTakingDays: 4,
		numOfPillsPerSheet: 28,
		beginSheetIndex: 0,
	},
	isAsyncStorageLoaded: false,
};