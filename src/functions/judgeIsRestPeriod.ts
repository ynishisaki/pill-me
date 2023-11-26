import { recordType } from "~/types/record";
import {
	hasNoRecordDays,
	countHaveBleedingDays,
	countIsRestPeriodDays,
	countTakeMedicineDays,
} from "~/functions/countRecord";

export const judgeIsTodayRestPeriod = (record: recordType): boolean => {
	const {
		beginSheetIndex,
		conteniousBleeingDaysForRest,
		maxConteniousTakingDays,
		minConteniousTakingDays,
		numOfPillsPerSheet,
		stopTakingDays,
	} = record.initialSheetSettings;

	const { takeMedicineDaysWithoutToday } = countTakeMedicineDays(record);
	const { haveBleedingDaysWithoutToday } = countHaveBleedingDays(record);
	const { restPeriodDaysWithoutToday } = countIsRestPeriodDays(record);
	const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

	// 記録忘れがある場合は判定しない（できない）
	if (hasNoRecordWithoutToday) return false;

	// 今日の記録があるので、それをそのまま返す
	if (!hasNoRecordToday) {
		const todayIsRestPeriod = record.dailyRecord[0].isRestPeriod;
		return todayIsRestPeriod;
	}

	// 今日の記録がないので、昨日までの記録から判定する
	// 昨日までで、服薬120日以上の場合 -> 今日から休薬期間
	// 昨日までで、服薬24日以上かつ出血3日以上の場合 -> 今日から休薬期間
	// 昨日までで、休薬期間1~3日以内の場合 -> 継続して今日も服薬期間
	const shouldRest =
		takeMedicineDaysWithoutToday >= maxConteniousTakingDays ||
		(takeMedicineDaysWithoutToday >= minConteniousTakingDays &&
			haveBleedingDaysWithoutToday >= conteniousBleeingDaysForRest) ||
		(restPeriodDaysWithoutToday > 0 && restPeriodDaysWithoutToday < stopTakingDays);
	return shouldRest;
};

export const judgeIsTomorrowStartsRestPeriod = (record: recordType): boolean => {
	const {
		beginSheetIndex,
		conteniousBleeingDaysForRest,
		maxConteniousTakingDays,
		minConteniousTakingDays,
		numOfPillsPerSheet,
		stopTakingDays,
	} = record.initialSheetSettings;

	const { tookMedicine, haveBleeding, isRestPeriod } = record.dailyRecord[0];
	const { takeMedicineDays } = countTakeMedicineDays(record);
	const { haveBleedingDays } = countHaveBleedingDays(record);
	const { restPeriodDays } = countIsRestPeriodDays(record);
	const { hasNoRecordWithoutToday, hasNoRecordToday } = hasNoRecordDays(record);

	// 記録忘れがある場合は判定しない（できない）
	if (hasNoRecordWithoutToday || hasNoRecordToday) return false;

	// 今日の記録がある場合のみ判定を行う
	// 今日までで、服薬120日以上の場合 -> 明日から休薬期間
	// 今日までで、服薬24日以上かつ出血3日以上の場合 -> 明日から休薬期間
	// 今日までで、休薬期間1~3日以内の場合 -> 継続して今日も服薬期間
	const shouldRest =
		(takeMedicineDays >= maxConteniousTakingDays && tookMedicine) ||
		(takeMedicineDays >= minConteniousTakingDays &&
			tookMedicine &&
			haveBleedingDays >= conteniousBleeingDaysForRest &&
			haveBleeding) ||
		(restPeriodDays > 0 && restPeriodDays < stopTakingDays);

	return shouldRest;
};
