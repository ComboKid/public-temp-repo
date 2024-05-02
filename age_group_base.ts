// name:: age_group_base.ts

/// this code is auto-generated by age-group-generator
/// do not modify this code manually
/// to regenerate this code, run `age-group-generator` in the terminal
import { Duration } from "../models/duration";
import { RemoteConfigValues } from "../models/remote_config_values";
import { AgeGroup } from "./age_group";
import { DateTime } from "../models/dateTime";

// a test line to trigger actions anodsdther try another
const _daysInMonth = 30.4166666667 as const;

export type AgeGroupType = {
  index: number;
  id: number;
  startOn: number;
  endOn: number;
  weeksCount: number;
  displayName: string;
  reportGenStartDay: number;
};

export class AgeGroupBase {
  readonly index: number;
  readonly id: number;
  readonly startOn: number;
  readonly endOn: number;
  readonly weeksCount: number;
  readonly displayName: string;
  readonly reportGenStartDay: number;
  readonly remoteConfigValues: RemoteConfigValues;

   static MAX_SUPPORTED_INDEX = 25 as const;

  constructor({
    index,
    id,
    startOn,
    endOn,
    weeksCount,
    displayName,
    reportGenStartDay,
    config,
  }: AgeGroupType & {
    config: RemoteConfigValues;
  }) {
    this.index = index;
    this.id = id;
    this.startOn = startOn;
    this.endOn = endOn;
    this.weeksCount = weeksCount;
    this.displayName = displayName;
    this.reportGenStartDay = reportGenStartDay;
    this.remoteConfigValues = config;
  }

  static create(age: AgeGroupType, config: RemoteConfigValues): AgeGroup {
    return new AgeGroup({
      ...age,
      config,
    });
  }

  get actualMonth() {
    const daysOld = this.endOn;
    if (daysOld < 0) {
      throw new Error(`Invalid daysOld: ${daysOld}`);
    }
    return daysOld / _daysInMonth;
  }

  static fromDate(date: DateTime, config: RemoteConfigValues): AgeGroup {
    const now = DateTime.now();
    const days = now.difference(date).inDays;
    return AgeGroupBase.fromDays(days, config);
  }

  static ofIndex(index: number) {
    return _ageGroups[index];
  }

  static fromId(id: number, config: RemoteConfigValues): AgeGroup {
    const ageGroup = _ageGroups.find((ag) => ag.id === id);
    if (!ageGroup) {
      throw new Error(`Age group not found for id: ${id}`);
    }
    return AgeGroup.create(ageGroup, config);
  }

  static fromDays(days: number, config: RemoteConfigValues): AgeGroup {
    const ageGroup = _ageGroups.find(
      (ag) => days >= ag.startOn && days <= ag.endOn
    );
    if (!ageGroup) {
      throw new Error(`Age group not found for days: ${days}`);
    }
    return AgeGroup.create(ageGroup, config);
  }

  static fromDuration(
    duration: Duration,
    config: RemoteConfigValues
  ): AgeGroup {
    return AgeGroupBase.fromDays(duration.inDays, config);
  }
}


export class ChildAgeGroupBase extends AgeGroup {
  readonly dateOfBirth: DateTime;
  readonly dueDate: DateTime | undefined;
  readonly daysOld: number;

  constructor({
    dateOfBirth,
    dueDate,
    remoteConfigValues,
  }: {
    dateOfBirth: DateTime;
    dueDate: DateTime | undefined;
    remoteConfigValues: RemoteConfigValues;
  }) {
    const duration = getAdjustedAgeDuration(
      dateOfBirth,
      dueDate,
      remoteConfigValues
    );
    const days = duration.inDays;
    super({
      ...AgeGroupBase.fromDays(days, remoteConfigValues),
      config: remoteConfigValues,
    });
    this.dateOfBirth = dateOfBirth;
    this.dueDate = dueDate;
    this.daysOld = getAdjustedAgeDuration(
      this.dateOfBirth,
      this.dueDate,
      remoteConfigValues
    ).inDays;
  }

  get actualMonth() {
    if (this.daysOld < 0) {
      throw new Error(`Invalid daysOld: ${this.daysOld}`);
    }
    return Math.floor(this.daysOld / _daysInMonth);
  }
}

const _ageGroups: AgeGroupType[] = [
  {index: 0, id: 0, startOn: 0, endOn: 29, weeksCount: 4, displayName: "0", reportGenStartDay: 0}, {index: 1, id: 1, startOn: 30, endOn: 59, weeksCount: 4, displayName: "1", reportGenStartDay: 30}, {index: 2, id: 2, startOn: 60, endOn: 90, weeksCount: 4, displayName: "2", reportGenStartDay: 60}, {index: 3, id: 3, startOn: 91, endOn: 120, weeksCount: 4, displayName: "3", reportGenStartDay: 91}, {index: 4, id: 4, startOn: 121, endOn: 151, weeksCount: 4, displayName: "4", reportGenStartDay: 121}, {index: 5, id: 5, startOn: 152, endOn: 181, weeksCount: 4, displayName: "5", reportGenStartDay: 152}, {index: 6, id: 6, startOn: 182, endOn: 211, weeksCount: 4, displayName: "6", reportGenStartDay: 182}, {index: 7, id: 7, startOn: 212, endOn: 242, weeksCount: 4, displayName: "7", reportGenStartDay: 212}, {index: 8, id: 8, startOn: 243, endOn: 272, weeksCount: 4, displayName: "8", reportGenStartDay: 243}, {index: 9, id: 9, startOn: 273, endOn: 303, weeksCount: 4, displayName: "9", reportGenStartDay: 273}, {index: 10, id: 10, startOn: 304, endOn: 333, weeksCount: 4, displayName: "10", reportGenStartDay: 304}, {index: 11, id: 11, startOn: 334, endOn: 364, weeksCount: 4, displayName: "11", reportGenStartDay: 334}, {index: 12, id: 12, startOn: 365, endOn: 394, weeksCount: 4, displayName: "12", reportGenStartDay: 365}, {index: 13, id: 13, startOn: 395, endOn: 424, weeksCount: 4, displayName: "13", reportGenStartDay: 395}, {index: 14, id: 14, startOn: 425, endOn: 455, weeksCount: 4, displayName: "14", reportGenStartDay: 425}, {index: 15, id: 15, startOn: 456, endOn: 485, weeksCount: 4, displayName: "15", reportGenStartDay: 456}, {index: 16, id: 16, startOn: 486, endOn: 516, weeksCount: 4, displayName: "16", reportGenStartDay: 486}, {index: 17, id: 17, startOn: 517, endOn: 546, weeksCount: 4, displayName: "17", reportGenStartDay: 517}, {index: 18, id: 18, startOn: 547, endOn: 576, weeksCount: 4, displayName: "18", reportGenStartDay: 547}, {index: 19, id: 20, startOn: 577, endOn: 637, weeksCount: 8, displayName: "19-20", reportGenStartDay: 608}, {index: 20, id: 22, startOn: 638, endOn: 698, weeksCount: 8, displayName: "21-22", reportGenStartDay: 669}, {index: 21, id: 24, startOn: 699, endOn: 759, weeksCount: 8, displayName: "23-24", reportGenStartDay: 730}, {index: 22, id: 27, startOn: 760, endOn: 850, weeksCount: 12, displayName: "25-27", reportGenStartDay: 821}, {index: 23, id: 30, startOn: 851, endOn: 941, weeksCount: 12, displayName: "28-30", reportGenStartDay: 912}, {index: 24, id: 33, startOn: 942, endOn: 1033, weeksCount: 12, displayName: "31-33", reportGenStartDay: 1003}, {index: 25, id: 36, startOn: 1034, endOn: 1124, weeksCount: 12, displayName: "34-36", reportGenStartDay: 1095}
];

export const AGE_GRP_CONSTS = {
  _daysInMonth,
};

// helpers
// Duration _getRealAgeFrom(DateTime dob, [DateTime? date]) =>
// (date ?? DateTime.now().normalizeTime()).difference(dob);
export const _getRealAgeFrom = (dob: DateTime, date?: DateTime): Duration => {
  return (date ?? DateTime.now().normalizeTime()).difference(dob);
};

const getAdjustedAgeDuration = (
  dob: DateTime,
  dueDate: DateTime | undefined,
  remoteConfigValues: RemoteConfigValues
): Duration => {
  if (!dueDate) {
    return _getRealAgeFrom(dob);
  }

  const age = AgeGroupBase.fromDate(dob, remoteConfigValues);
  if (
    age.actualMonth >= remoteConfigValues.MAX_PREMATURE_MONTH ||
    age.actualMonth === 0
  ) {
    return _getRealAgeFrom(dob);
  }

  const ageDiff = dueDate.difference(dob);
  if (ageDiff.inDays < remoteConfigValues.PREMATURE_DAYS) {
    return _getRealAgeFrom(dob);
  }

  const actual = _getRealAgeFrom(dob);
  const adjustedDur = new Duration({
    milliseconds: actual.inMilliseconds - ageDiff.inMilliseconds,
  });

  if (adjustedDur.isNegative) {
    return new Duration({ days: 0 });
  }

  return adjustedDur;
};


