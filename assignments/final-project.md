---
layout: page
title: Optional Final Project
nav_order: 5
description: >-
    Data Engineering
markdown: kramdown
permalink: /assignments/final-project/

deadlines:
  overview: "Monday 11/4/24"
  spec: "Friday 11/8/24"
  team: "Tuesday 11/12/24, 5pm PT"
  team_confirm: "Thursday 11/14/24"
  checkpoint: "Monday 11/25/24 5pm PT"
  final: "Monday 12/9/24 5pm PT"

team_form: "https://docs.google.com/forms/d/e/1FAIpQLSe7Suf2tv9wX2d8iZvB79GbqP5_jR0ind4g7ZgHApopr9QkEA/viewform?usp=sf_link"
---

# Optional Final Project
{:.no_toc}

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Overview

The (optional) Data 101 final project is a multi-part group project. You will complete an investigation of two data systems—one of which is PostgreSQL and the other will be a non-relational system of your choice—based on a **performance benchmark** (dataset, queries, and measurements) of your design.

*   The final project is **optional**; if you submit it, it will be [10% of your final grade]({{site.base_url}}/syllabus).
*   **Detailed guidelines will be released on {{page.deadlines.spec}}**, but if you are interested in completing this optional final project, we encourage you to skim this page and start finding groups for the Team Matching Survey deadline on {{page.deadlines.team}}. A Project Partner search thread has also been posted on Ed.

You will submit a GitHub repository and written report, where your analysis will include the following steps:

1. **Design your dataset**. Design a relational schema for a chosen dataset. Draw an ER diagram for your schema.
   * We have curated **a list of suggested datasets** to use for your project, but you are also welcome to select an external dataset:
     * Yelp: [https://www.yelp.com/dataset](https://www.yelp.com/dataset)
     * Open Library: [https://openlibrary.org/developers/dumps](https://openlibrary.org/developers/dumps)
     * Wikipedia: [https://dumps.wikimedia.org/](https://dumps.wikimedia.org/)
     * If you would like to “bring your own” dataset, the spec (TBD) will give the full details on what constitutes a “large and complex enough” dataset. But see the above examples for some ideas.
2. **Load your dataset into PostgreSQL**. Given the size of your dataset, instead of DataHub you may need to do a local installation of JupyterHub and PostgreSQL \>14. More installation details to follow.
3. **Load your dataset into a non-relational data system**. Some examples could include: MongoDB, Graph databases (neo4j), Streaming databases (Flink, Kafka), key-value store (Redis, memcached), Spark, Velox, Polars, Apache Data Fusion, Ibis. Be creative here\! If you need help with picking a data system, or other feedback in general, feel free to post on Ed.
4. **Design and analyze a benchmark set of tasks**. Select a representative set of 5 queries (i.e., tasks) that compare the two data system on the following dimensions:
   * Fitness/ergonomics: Is your data system well-designed for the task? How easy is it to complete this task and/or can it even do the task? (i.e., does the system aid you in writing the queries you are trying to write)
   * Performance: How much disk storage or memory (RAM) and time resources does each system spend to complete this task?
5. **Present your findings in a written report.** This report could be used in an imaginary scenario where, say, a manager or labmate could use your report to determine which of two data systems to use. Your report therefore should include diagrams, code snippets, tables/visualizations (where appropriate), and broader reflections/recommendations about the usability of the systems themselves (ease of setup/debugging, etc.)
   * You are also required to submit a **project checkpoint**. For the checkpoint, we expect you to cover enough setup/groundwork such that you can run at least one query in PostgreSQL on your chosen dataset.

**Group work requirement**: You **must be in a team of 3 or 4**. If you’re looking for a group OR if you have a partial/full team, **everyone who is looking to do the final project must fill out this [Team Matching Survey]({{ page.team_form }}) by {{page.deadlines.team}}**. Group confirmations will be sent out by {{page.deadlines.team_confirm}}. Limited pre-approved exceptions will be made for personal circumstances, or senior/honors thesis work; see the Project Deliverables section for more details.

### Learning Goals

This project is designed to give you a “real-world” example of working with an unknown dataset, and doing so in a team. We *do not expect you to have all the answers*, and there are a number of tasks which are not directly covered in class.

You should expect to get practice with:

* Software Engineering:
  * Setting up new tools on your own computer and debugging the error messages that (sometimes) happen
  * Reading documentation for new tools
  * Working with git and GitHub
* Data Engineering:
  * Interpreting an unknown dataset
  * Designing a schema / modeling a database
  * Analyzing professional data systems
* Professional Skills:
  * Working in groups effectively
  * Writing and communicating technical concepts

## Project Deliverables

### Team Matching Survey (due {{page.deadlines.team}})

**You must work in groups of three or four, and you must fill out the [Team Matching Survey]({{page.team_form}})** by {{page.deadlines.team}}:

* If you don’t have a group, you must **individually** fill out the form and you will be randomly assigned a group.
* If you have a partial group (e.g., a pair), **one person** must fill out the form by the deadline, and you will be randomly assigned 1-2 additional members.
* If you do have a full group, **one person** must fill out the form by the deadline to declare your group.
* Group confirmations will be sent out latest {{page.deadlines.teams_confirm}}.
* Please note that you will be evaluating your group members at the end of the project: we strongly encourage you to discuss and resolve any conflicts with your group members sooner rather than later.

In very special circumstances (e.g., extenuating personal circumstances or ongoing personal project such as a senior thesis), we will allow students to work alone. If you believe you qualify for this exception, please email [{{site.course_email}}](mailto:{{site.course_email}}) AND cc instructors ASAP with relevant information/documentation. Do not assume the exception has been granted until you receive a confirmation email.

### Checkpoint: Checkpoint Report and GitHub Repository (due {{page.deadlines.checkpoint}})

The checkpoint report will be a relatively short report to make sure your team is on track. Your team will submit one **GitHub Repository and a written report** to Gradescope.

You may choose to write your report in your team’s preferred tool (e.g., Overleaf or Google Docs), but it should contain:

* Your choice of dataset, and why
  * If you choose to bring your own dataset, you must demonstrate that it meets the requirements laid out in the spec, and provide a link so that the staff can access the dataset. If it is a private dataset (e.g., IRB-restricted, personally identifiable information, etc.), please send an email to data101@ and cc the instructors; we may ask to set up a short Zoom call with you.
* A relational schema for your dataset. This can be an ER diagram, SQL, or output from `psql`.
* An example of how you loaded data into Postgres, e.g. include code snippets, notebooks, etc.
* An example of at least one query showing data from this dataset.
  * You should explain what task the query is trying to accomplish, and why this task might be a reasonable approach for understanding your data system.
  * For the checkpoint, this query does not need to be very complex.
* A plan for the non-relational parts of the project
  * What other database do you plan to use?
  * How might you plan to compare Postgres to this other database?

Your checkpoint report is **expected to be about 500-800 words**  and should include code snippets, charts, or tables as necessary. This file should be saved as `0-checkpoint.pdf` and included in your GitHub repository.

You will **also** be required to individually fill out a Google Form asking how the project is going in general. While we won’t share your comments to this Form directly with anyone else in your group, course staff will reach out to any groups that raise issues, so that we can help you resolve them and work productively with your group.

### Final Report and GitHub Repository (due {{page.deadlines.final}})

Your team will (again) submit **one GitHub repository and written report** to Gradescope. Your final report is **expected to be about 1800-2500 words long** and should include code snippets, charts, tables, and screenshots as necessary. Including diagrams and/or code, we expect your report to be **9–12 pages**. We won’t be strictly enforcing these word/page limits, but reports that are much longer are subject to a penalty; reports that are much shorter are probably missing important discussion.

Your final report is expected to build upon much of your checkpoint report. Of course, some of your expectations from your checkpoint will likely need to be revised.

This file should be named `1-final-report.pdf` and should be committed to your GitHub repo.

**In addition to the sections listed in the checkpoint report,** include:

* **Both** an ER Diagram of your relational schema and the complete schema
* 3 - 4 queries in SQL that demonstrate your dataset
* At least 2 queries of your non-relational database
* For each query, you should:
  * Explain what task the query is trying to accomplish
  * Explain why this is a reasonable tasks for understanding or evaluating your chosen data system
  * Include the code
  * Include the output (or sample output if it is too large)
  * An analysis of its performance
    * What could make it faster? What did you try to make it faster?
    * For example, if you added an index, show the before and after.
* A comparison of tools (e.g., data systems) for fitness, ergonomics and performance
  * Consider the general use of the tool, installation, setup, etc.  (What was it like to learn the tool?)
  * What queries were ‘best’ suited to that tool?
    * Consider performance, ease of writing, etc.
  * Does one tool allow tasks which are incredibly difficult in the other tool?
* Reflections of tools
  * If you were recommending someone else (e.g. your manager or labmate) pick one of these tools, what would it be and why?
  * Think broadly beyond just the data systems, what worked well and didn’t work so well?
* *Individual Reflections*
  *  Each team member should include a paragraph about your personal reflections on the project. What did you learn? What did you find most exciting, or perhaps most frustrating?
  * It’s OK if you and your teammates share some of your reflections.
* If relevant, include a reference page with citations of all outside sources used.

Your final submission should include your report, and all code written to help produce the report. You should not include the raw data in your GitHub repo.

You may use up to 2 slip days on this optional final project.

*We will be releasing a sample outline of a final report on* {{page.full_spec}}*.*

### Team Member Assessment (due {{page.deadlines.final}})

This will be a short survey (submitted with your final submission) assessing you and your teammates contributions to the project. Each member will make an individual submission which is **anonymous** to your teammates.

---

## FAQ

<details>
  <summary>How does the overall DATA101 Grading work?</summary>
</details>

<details>
  <summary>How are slip days handled?</summary>
</details>

---

## Acknowledgments

Select wording for the specifications (in particular, the entirety of “Working in Groups”) are drawn from the Data 102: Inference and Decision-Making ([https://data102.org/](https://data102.org/)) Final Project.
