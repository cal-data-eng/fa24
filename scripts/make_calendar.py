"""Generate the weekly calendar for the course website."""
from datetime import datetime
import os
import re
from typing import Iterable, Optional

import pandas as pd

SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))
DATA_DIR = os.path.join(SCRIPT_DIR, "data")
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "../_modules/")

CALENDAR_CSV_FILE = os.path.join(
    DATA_DIR, "[Data101 Fa23] Central Logistics - Calendar.csv"
)

# What year are we in?
YEAR = 2023

# Number of rows in the calendar, minus the header row.
CALENDAR_NUM_ROWS = 117

# Column indexes in the CSV file.
WEEK = 1
DATE = 2
LECTURE = 7
DISCUSSION = 9
PROJECT_RELEASE = 10
MULTIVITAMIN_RELEASE = 12


def parse_date(date: str) -> datetime:
    return datetime.strptime(f"{YEAR}/{date}", "%Y/%m/%d")


class EmptyEvent:
    def render(self) -> None:
        return None


class BaseEvent:
    next_number = 1

    def __init__(self, title: str):
        # Remove the leading number and colon if present.
        title = re.sub(r"\w*\W*\d+:\s+", "", title)
        self.title = title
        self.number = self.__class__.next_number
        self.__class__.next_number += 1

    @classmethod
    def new(cls, title: str) -> Optional["BaseEvent"]:
        if pd.isna(title):
            return EmptyEvent()
        title_lower = title.lower()
        if "no " in title_lower or "none" in title_lower:
            return EmptyEvent()
        return cls(title)


class Lecture(BaseEvent):
    def render(self) -> str:
        return f": **Lecture {self.number}**{{: .label .label-lecture }}{self.title}"


class Discussion(BaseEvent):
    def __init__(self, title: str):
        super().__init__(title)

    def render(self) -> str:
        return f": **Discussion {self.number}**{{: .label .label-disc }}{self.title}"


class Project(BaseEvent):
    def render(self) -> str:
        return f": **Project {self.number}**{{: .label .label-proj }}{self.title}"


class MultiVitamin(BaseEvent):
    def render(self) -> str:
        return f": **MultiVitamin {self.number}**{{: .label .label-hw }}{self.title}"


class DaySchedule:
    def __init__(self, row: tuple):
        self.date = parse_date(row[DATE])
        self.lecture = Lecture.new(row[LECTURE])
        self.discussion = Discussion.new(row[DISCUSSION])
        self.project = Project.new(row[PROJECT_RELEASE])
        self.multivitamin = MultiVitamin.new(row[MULTIVITAMIN_RELEASE])

    def is_empty(self) -> bool:
        return (
            isinstance(self.lecture, EmptyEvent)
            and isinstance(self.discussion, EmptyEvent)
            and isinstance(self.project, EmptyEvent)
            and isinstance(self.multivitamin, EmptyEvent)
        )

    def render(self) -> str:
        for s in self.render_impl():
            print(s)
        # return "\n\n".join(self.render_impl()) + "\n"
        return "\n".join(self.render_impl()) + "\n"

    def render_impl(self) -> Iterable[str]:
        yield self.date.strftime("%a %-m/%-d")
        if (s := self.lecture.render()) is not None:
            yield s
        if (s := self.discussion.render()) is not None:
            yield s
        if (s := self.project.render()) is not None:
            yield s
        if (s := self.multivitamin.render()) is not None:
            yield s


class WeekSchedule:
    def __init__(self, week: str | int):
        try:
            week = int(week)
            week = f"{week:02}"
        except:
            pass
        self.week = week
        self.days = []

    def add_day(self, row: tuple) -> None:
        day_schedule = DaySchedule(row)
        self.days.append(day_schedule)

    def render_front_matter(self) -> str:
        return f"""---
title: Week {self.week}
date: {self.days[0].date.strftime("%Y-%m-%d")}
---
"""

    def commit(self) -> None:
        filename = os.path.join(OUTPUT_DIR, f"week-{self.week}.md")
        print(f"Writing {filename}")
        with open(filename, "w") as fout:
            front_matter = self.render_front_matter()
            print(front_matter, file=fout)
            for day in self.days:
                if day.is_empty():
                    continue
                day_schedule = day.render()
                print(day_schedule, file=fout)


def load_data() -> pd.DataFrame:
    df = pd.read_csv(CALENDAR_CSV_FILE)
    df = df.head(CALENDAR_NUM_ROWS)
    return df


def main():
    df = load_data()
    week_schedule = None
    for row in df.itertuples():
        week = row[WEEK]
        if not pd.isna(week):
            if week_schedule is not None:
                week_schedule.commit()
            week_schedule = WeekSchedule(week)
        week_schedule.add_day(row)


if __name__ == "__main__":
    main()
