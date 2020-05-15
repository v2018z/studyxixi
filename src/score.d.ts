declare interface RateScoreT {
	ruleId: number;
	name: string;
	desc: string;
	currentScore: number;
	dayMaxScore: number;

	(name: string): string;
}

export declare var rateScore: RateScoreT;