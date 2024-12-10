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

## Quick Links
{: .no_toc .text-delta }

* Jump to [Getting Started](#getting-started)
* [Final Project Tips]({{site.baseurl}}/assignments/final-project-tips)
* [Template repository](https://github.com/cal-data-eng/final-proj){:target="\_blank"}
* Checkpoint Gradescope Submissions:
  * [Checkpoint Submission [Group]][fp_repo_checkpoint]
  * [Checkpoint Peer Assessment [Individual]][fp_gradescope_checkpoint]
  * [Final Submission [Group]][fp_repo_submission]
  * [Peer Assessment [Individual]][fp_peer_assess]

[fp_repo_submission]: https://www.gradescope.com/courses/835949/assignments/5426574/
[fp_peer_assess]: https://www.gradescope.com/courses/835949/assignments/5426573/
[fp_repo_checkpoint]: https://www.gradescope.com/courses/835949/assignments/5331860
[fp_gradescope_checkpoint]: https://www.gradescope.com/courses/835949/assignments/5332076


## Overview

The final project is **optional**; if you submit it, it will be [10% of your final grade]({{site.baseurl}}/syllabus). The final project will be a multi-part group project which will ask that you complete an investigation of two data systems—one of which is PostgreSQL and the other will be a non-relational system of your choice—based on a **performance benchmark** (dataset, queries, and measurements) of your design.

If you are interested in completing this optional final project, we encourage you to skim this page and start finding groups for the [Team Matching Survey]({{page.team_form}}) deadline on **{{page.deadlines.team}}**. A Project Partner search thread has also been posted on Ed.
Group confirmations will be released on **{{page.deadlines.team_confirm}}**.

You will submit a GitHub repository and written report, where your analysis will include the following steps:

1. **Design your dataset schema**. Design a relational schema for a chosen dataset. Draw an ER diagram for your schema.
   * We have curated **a list of suggested datasets** to use for your project, but you are also welcome to select an external dataset:
     * Yelp: [https://www.yelp.com/dataset](https://www.yelp.com/dataset)
     * Open Library: [https://openlibrary.org/developers/dumps](https://openlibrary.org/developers/dumps)
     * Wikipedia: [https://dumps.wikimedia.org/](https://dumps.wikimedia.org/)
       * You will likely want to start with a [recent dump of English Wikipedia](https://dumps.wikimedia.org/enwiki/20241020/). ([https://dumps.wikimedia.org/enwiki/20241101/](https://dumps.wikimedia.org/enwiki/20241101/))
       * We **do not** recommend that you consider the full text/HTML dump of Wikipedia for this assignment, and only the metadata about the articles. However, you could choose to sample the text dump.
       * [Wikipedia maintains a guide](https://en.wikipedia.org/wiki/Wikipedia:Database_download) on their own data dumps.
     * If you would like to “bring your own” dataset, see the section “Choosing an alternate dataset” for more information.
2. **Load your dataset into PostgreSQL**. Given the size of your dataset, instead of DataHub you may need to do a local installation of JupyterHub and PostgreSQL \>14. More installation details to follow.
3. **Load your dataset into a non-relational data system**. Some examples could include: MongoDB, Graph databases (neo4j), Streaming databases (Flink, Kafka), key-value store (Redis, memcached), Spark, Velox, Polars, Apache Data Fusion, Ibis. Be creative here\! If you need help with picking a data system, or other feedback in general, feel free to post on Ed.
4. **Design and analyze a benchmark set of tasks**. Select a representative set of 5 queries (i.e., tasks) that compare the two data system on the following dimensions:
   * Fitness/ergonomics: Is your data system well-designed for the task? How easy is it to complete this task and/or can it even do the task? (i.e., does the system aid you in writing the queries you are trying to write)
   * Performance: How much disk storage or memory (RAM) and time resources does each system spend to complete this task?
5. **Present your findings in a written report.** This report could be used in an imaginary scenario where, say, a manager or labmate could use your report to determine which of two data systems to use. Your report therefore should include diagrams, code snippets, tables/visualizations (where appropriate), and broader reflections/recommendations about the usability of the systems themselves (ease of setup/debugging, etc.).
   * You are also required to submit a **project checkpoint**. For the checkpoint, we expect you to cover enough setup/groundwork such that you can run at least one query in PostgreSQL on your chosen dataset.

**Group work requirement**: You **must be in a team of 3 or 4**. If you’re looking for a group OR if you have a partial/full team, everyone who is looking to do the final project must fill out this **[Team Matching Survey]({{page.team_form}})** by {{page.deadlines.team}}. Group confirmations will be sent out by **{{page.deadlines.team_confirm}}**. Limited exceptions will be made for personal circumstances, or senior/honors thesis work; see the Project Deliverables section for more details.

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

[Jump to Top](#top)

---

## Pick your project scope: a dataset and second system

The goal of this project is to create a performance benchmark to analyze and study two different systems: PostgreSQL and another system of your choice. A performance benchmark is often a standard set of tasks performed on a given workload. In your project, you will define a workload as your dataset, and you will define tasks as queries, materializations, deletions, pipelined tasks—anything that will give you more information about how the systems work.

Because of the open nature of this project (choice of second data system, workload, and tasks), **for this first version of the project, we suggest a default project** below to constrain your search space. However, you should definitely feel free to explore other options beyond the default project—particularly if you came across a cool system or dataset in lecture or in the wild\!

Please see the FAQ if you are on the fence about doing the final project.

### :memo: Suggested Default Project

We suggest the following choices for most project teams:

* PostgresSQL
* Dataset: Yelp
* Compare to: MongoDB

This default project still leaves a lot of room for your team to decide on the set of benchmark tasks. You can also decide what additional entities to build into your project. We recommend looking at `users`, `businesses` and `reviews` if you don’t know where to start. For example, each `user` has a list of `friends` which could make for some interesting comparisons between SQL and NoSQL systems.

**Reducing dataset complexity**: The Yelp dataset (Main, not Photos) is relatively large, about \~10GB when uncompressed. You do not _**need**_ to load all of the records into your Postgres (or MongoDB) databases. We recommend _**sampling**_ the Yelp dataset and/or choosing a subset of the database schema to make working with the dataset easier (see [Final Project Tips]({{site.baseurl}}/assignments/final-project-tips)). In your written report, you will need to demonstrate that the reduced dataset that you construct for your workload **must meet the minimum requirements** listed in the Choosing an alternate dataset section below.

### Choosing an alternate dataset

If you’d like to pick a different dataset, you are welcome to do so. However, it must meet **all** of the following requirements:

* Total uncompressed size ≥ 1GB of data
* Minimum of 1 million records (across all entities)
* Minimum of 3 distinct types of entities (e.g. users, resources, reviews)
* Each entity must have at 2 non-primary/non-foreign key attributes
* There must be at least 2 foreign key relationships (e.g. users who leave reviews, and reviews which belong restaurants)


The data set must be something which is appropriate to write about in a report which is read by the course staff and your teammates. It cannot have “confidential” data (e.g. from a business).

In your written report you will need to demonstrate that your dataset meets these requirements.

**How might you decide if an alternate dataset makes sense?**
If you are looking for alternate datasets, it can be helpful to pick a domain in which you have expertise or deep interest amongst your teammates.

Otherwise, you should consider the clarity and organization of the raw data. We’ve suggested datasets which should minimize the amount of the needed to be spent cleaning and interpreting data—though some of that work is always necessary. Look for data which are well documented, have clearly named attributes, and come in easy-to-parse formats like JSON, CSV or YAML.

### Another system and/or application

You’ve already gained experience with Postgres; now you must pick a *different* data system or application to explore. The data system should help you accomplish some tasks which are different from that of a typical relational database. Some examples could include: MongoDB, Graph databases (neo4j), Streaming databases (Flink, Kafka), key-value store (Redis, memcached), Spark, Velox, Polars, Apache Data Fusion, Ibis, Apache airflow, dbt. Be creative here\! If you need help with picking a data system, or other feedback in general, feel free to post on Ed.

Start by exploring your dataset and asking: “Where might a RDMS not be well-suited for storing, analyzing, or processing this dataset?”  This will help guide you towards a tool that will lead to more interesting insights.

**How do you decide on a tool/system before using it?**
Read the docs\! Watch some videos. Do a brief search for problems, errors, or user communities. Ideally, you will be able to work with and learn about a tool which has excellent documentation and for which it is easy to search for answers to questions. Much of this research can all happen before you even install the tool. No one is expected to learn new tools simply by guessing the right commands; learning how to use the documentation provided will make the process much easier\!

You should also consider picking a tool based on its **fitness and ergonomics** for the tasks you want to accomplish. See the Design and Analyze a Benchmark Set of Tasks for more information.

[Jump to Top](#top)

---

## Get Started

### Template Repository

To get started, **one** team member needs to create a **private** GitHub repository.
Start from the [**DATA 101 Final Project Template**](https://github.com/new?owner=cal-data-eng&template_name=final-proj&template_owner=cal-data-eng) (​[https://github.com/new?owner=cal-data-eng\&template\_name=final-proj\&template\_owner=cal-data-eng](https://github.com/new?owner=cal-data-eng&template_name=final-proj&template_owner=cal-data-eng))

Your project repo should be **private.** After creating your repository, add your teammates as collaborators.

The repository we’ve provided is a light scaffold to get you started. You are free to adapt it for your team’s needs as necessary. However, be careful not to commit very large files to git.

### Setup and install your tools

We expect each team member to install tools on their local machines. DataHub is available as a backup. [Final Project Tips]({{site.baseurl}}/assignments/final-project-tips) includes some tips for installing tools.

For most tools, like PostgreSQL or MongoDB, you should get started by following the installation instructions in the official documentation.

## Design Your Dataset Schema

Review the documentation for your chosen dataset. Your job will be to design a *relational schema* for your dataset. You will probably want to inspect the raw documents to determine the **type** (e.g., integer, text) for each attribute.

_**Note**_: We do not require that your schema be **purely** relational. You may choose to make use of PostgreSQL’s support for `jsonb` and `array` column types.

You may choose to simply the suggested datasets based on the type of analysis you do. However, any simplification must still meet the minimum requirements for datasets as listed in the section “Choosing an alternate dataset”.

A good schema will have clear names for tables and columns following the [DATA 101 SQL Style Guide](https://data101.org/notes/appendix/sql-style.html), and will use primary and foreign keys as appropriate. In your schema you should also consider what columns should be indexed, and whether any additional constraints (like `NOT NULL`) would be helpful.

We suggest you start not by writing the DDL, but by mapping out a (simplified) ER Diagram. Tools like [Lucidchart](https://www.lucidchart.com/pages/) or Google Drawing might be helpful. You can also try tools like [dbdiagram.io](http://dbdiagram.io) which allow you to use SQL to generate the diagram if you prefer to work that way\!

The project checkpoint will ask for just *one* of your schema or the ER Diagram, but the final report will ask that you submit **both** components. It is totally OK to adapt your schema as you learn more about your dataset, and for the schemas included in your checkpoint and final reports to not be exactly the same.

[Jump to Top](#top)

---

## Load Your Dataset into PostgreSQL and Another Data System

### Data Loading, Cleaning, and Sampling

If you sample, sample down to roughly the additional dataset parameters (1 GB, \~1 million total records). Review the lecture on sampling for some example code. You can choose whether to sample a dataset before or after loading it into your database.

The final project tips page also includes some guidance on using Python to interact with a Postgres database using the library `psycopg`. You are also welcome to copy code from any of your project notebooks to help you get started. Otherwise, there will be Ed threads dedicated to each tool and dataset where you can ask questions and share code.

## Design and Analyze a Benchmark Set of Tasks

In this assignment, you will need to decide a **benchmark set of tasks**. Select a representative set of 5 queries (i.e., tasks) that compare the two data system on the following dimensions:

* **Fitness/ergonomics**: Is your data system well-designed for the task? How easy is it to complete this task and/or can it even do the task? (i.e., does the system aid you in writing the queries you are trying to write)
* **Performance**: How much disk storage or memory (RAM) and time resources does each system spend to complete this task?

Other requirements for the five tasks:

* 3 SQL queries should be runnable on Postgres.
* 2 queries should be runnable on your second system.
* Ideally, all five tasks can be run on both systems so that you can compare both fitness/ergonomics and performance. However, you may find midway through that, say, some SQL queries can’t be implemented in the second system, or vice versa. See the apples to oranges section below.

**Choosing tasks**
The tasks you select should help to best demonstrate the capacities of systems you are comparing. For example, consider not just the execution time of an individual query, but the time that it took to load data in, the memory (RAM) or storage uses of that particular system. If you were to consistently integrate new data, how would this system perform? What parameters does each system provide that allow you to improve performance of a given task or workload? Etc.

**Fitness and “ergonomics”**
The **fitness** of a tool describes how well suited a tool is to a specific task. When comparing tools, one of your tasks will be to compare their fitness for the particular problem you are trying to solve. For example, both MongoDB and PostgreSQL can store and query semi-structured data, but they take very different approaches.

When engineers talk about “**ergonomics**” (or affordances) they are referring to whether a particular tool makes it easy or intuitive to accomplish a specific task. One example: Jupyter Notebooks provide good ergonomics for exploring data. Another example: SQL databases make `JOIN`ing data convenient, but MongoDB does not.

**Comparing apples to oranges**
It can be tricky to compare a RDBMS to a NoSQL DB when they are *designed* to solve different problems. Think holistically about the comparisons, both for fitness, ergonomics, and performance. Ultimately, if a task cannot be implemented in one system, you should still reflect on why the task selection was a good choice, and what barriers/constraints you found in the other system.

[Jump to Top](#top)

---

## Present Your Findings

You are expected to write a report to present your project findings such that another person could understand what are the tradeoffs between the two data systems you analyzed, and (perhaps more importantly) how you conducted your analysis. Your report therefore should include diagrams, code snippets, tables/visualizations (where appropriate), and broader reflections/recommendations about the usability of the systems themselves (ease of setup/debugging, etc.).

You are required to submit both a checkpoint report (as part of the project checkpoint) and a final report. Please see the Deliverables section below for more details. We have included **report templates in the project repository**; you should feel free to start from these, and use your team’s preferred tool (e.g., Overleaf or Google Docs) to write the report.

### Report Components

Your report(s) should address the following. Items are tagged to indicate if they should be addressed in only the `checkpoint` report, only the `final` report, or `both`.

* **Dataset Selection**. Explain your choice of dataset, and any concessions you needed to make.
  * `both` If you choose to use your own dataset, describe the data source and download process, and demonstrate that it meets the requirements laid out in the spec, and provide a link so that the staff can access the dataset.
    * `checkpoint` If it is a private dataset (e.g., IRB-restricted, personally identifiable information, etc.), you should not give dataset access to course staff. Instead, please send an email to data101@ and cc the instructors; we may ask to set up a short Zoom call with you.
  * `both` Decide whether to sample/truncate your dataset, and briefly explain your reasoning. If you choose to sample/truncate your dataset, describe how you did so. Do not include code here; you will do so in the later sections.
* **Database structure**.
  * `checkpoint` A working database schema for the relational component of your dataset. This can be an ER diagram, or output from `psql`.
  * `final` For your Postgres system:
    * An ER Diagram for your dataset, and
    * The complete database schema. For each table you create, share the result of executing `\d [table_name]` in a `psql` console.
  * `final` Any additional adjustments you needed to make for your non-relational data system, including diagrams, snapshots, and code as needed. For example, if you chose MongoDB, you should list the collections that you created and the types of documents that you put in those collections. On the other hand, if you are using a pipeline tool, you should describe how you structured that tool.
* **System and Database Setup**.
  * `both` Describe how you loaded data into Postgres, e.g. include code snippets, diagrams, etc.
    * `checkpoint` You do not need a full description, but you need to show enough progress that you have set up and imported a portion of the dataset.
    * `both` Are you using DataHub or your local computer(s) for compute resources? Are you using that same setup to store your database, or are you using another (cloud) system?
  * `final` Describe how you loaded data into your other system; include code snippets, diagrams, etc.
  * `final` Describe additional transformations you applied to your data. If you sampled, what techniques and tools did you use? What ways did you clean the data or address missing values? If your original data source was not in a rectangular format (e.g., JSON or XML), how did you translate it into a relational format? Did you have to make concessions in your database setup? For example, were you unable to translate certain parts of your dataset in either of the data systems? (You will have a chance to reflect on these tradeoffs later in your report.)  Did you have to do any entity resolution across multiple parts of your dataset?
* **Task selection**.
  * `checkpoint` An example of **at least one query** showing data from this dataset. You should explain what task the query is trying to accomplish, and why this task might be a reasonable approach for understanding your data system. For the checkpoint, this query does not need to be very complex.
  * `final` The full set of queries: **3 - 4 queries** in SQL that demonstrate your dataset, and at least **2 queries** of your non-relational database. For each query, you should:
    * Explain what task the query is trying to accomplish
    * Explain why this is a reasonable tasks for understanding or evaluating your chosen data system
    * Include the code
    * (If useful for further explanation) include the output (or sample output if it is too large)
    * An analysis of its performance. What could make it faster? What did you try to make it faster? For example, if you added an index, show the before and after.
* `checkpoint` **Future plan**. A plan for the non-relational parts of the project. A paragraph or two is fine. What other database do you plan to use? How might you plan to compare Postgres to this other database?
* `final` **Tool comparison**. A comparison of tools (e.g., data systems) for fitness, ergonomics and performance. Consider the general use of the tool, installation, setup, etc. What was it like to learn the tool?  What queries were “best” suited to that tool (performance, ease of writing, etc.) Does one tool allow tasks which are incredibly difficult in the other tool?
* `final, optional` **Additional tools used**. If you used any additional tools beyond the two data systems, describe them here and why they were helpful (or not).
* `final` **Reflections**. If someone else (e.g., your manager or labmate) were to consider these tools for similar tasks and/or workloads, what recommendations would you give them, and why? Think broadly beyond just the task/workload performance and consider the usability and ergonomics of the systems themselves: ease of setup, learning to use the tool, how useful it was to design and execute tasks, debugging capabilities, what worked well, what didn’t work so well, etc.
* `final` **Individual Reflections**
  * Each team member should include a paragraph about your personal reflections on the project. What did you learn? What did you find most exciting, or perhaps most frustrating?
  * It’s OK if you and your teammates share some of your reflections.
* `final, optional` If relevant, include a reference page with citations of all outside sources used.
* `final, optional` **Appendix**. Does not count towards your page limit, but could include more examples of your data, or example query output, or other sorts of visualizations and descriptions you may find useful to supplement the main report.

[Jump to Top](#top)

---

## Project Deliverables

### 1\. Team Matching Survey (due {{page.deadlines.team}})

**You must work in groups of three or four, and you must fill out the [Team Matching Survey]({{page.team_form}})** by {{page.deadlines.team}}:

* If you don’t have a group, you must **individually** fill out the form and you will be randomly assigned a group.
* If you have a partial group (e.g., a pair), **one person** must fill out the form by the deadline, and you will be randomly assigned 1-2 additional members.
* If you do have a full group, **one person** must fill out the form by the deadline to declare your group.
* Group confirmations will be sent out latest {{page.deadlines.teams_confirm}}.
* Please note that you will be evaluating your group members at the end of the project: we strongly encourage you to discuss and resolve any conflicts with your group members sooner rather than later.

In very special circumstances (e.g., extenuating personal circumstances or an ongoing personal project such as a senior thesis), we will allow students to work alone. If you believe you qualify for this exception, please email [{{site.course_email}}](mailto:{{site.course_email}}) AND cc instructors ASAP with relevant information/documentation. Do not assume the exception has been granted until you receive a confirmation email.

### 2\. Checkpoint: Checkpoint Report and GitHub Repository (due {{page.deadlines.checkpoint}})

The checkpoint report is a relatively short report to make sure your team is on track. Your team will submit one **GitHub Repository and a written report** to Gradescope. See the [Present Your Findings](#present-your-findings) section for report components.

Your checkpoint report is **expected to be about <s>500-800</s> 700-1600 words** and should include code snippets, charts, or tables as necessary. You may choose to write your report in your team’s preferred tool (e.g., Overleaf or Google Docs). This file should be saved as `0-checkpoint.pdf` and included in your GitHub repository.

Your GitHub repository submission should include your report, and all code written to help produce the report. You should not include any raw dataset data in your GitHub repo.

You will **also** be required to individually fill out a Google Form asking how the project is going in general. While we won’t share your comments to this Form directly with anyone else in your group, course staff will reach out to any groups that raise issues, so that we can help you resolve them and work productively with your group.

You may use up to 2 slip days on the checkpoint submission.

### 3\. Final Report and GitHub Repository (due {{page.deadlines.final}})

Your final report is expected to build upon much of your checkpoint report. Of course, some of your expectations from your checkpoint will likely need to be revised. Your team will submit **one GitHub repository and written report** to Gradescope. see the [Present Your Findings](#present-your-findings) section for report components.

Your final report is **expected to be about <s>1800-2500</s> 2700-4000 words long** and should include code snippets, charts, tables, and screenshots as necessary. You may choose to write your report in your team’s preferred tool (e.g., Overleaf or Google Docs). This file should be named `1-final-report.pdf` and should be committed to your GitHub repo.

Including diagrams and/or code, we expect your report to be **<s>9–12</s> 13-28 pages**. We won’t be strictly enforcing these word/page limits, but reports that are much longer are subject to a penalty; reports that are much shorter are probably missing important discussion.

Your GitHub repository submission should include your report, and all code written to help produce the report. You should not include any raw dataset data in your GitHub repo.

You may use up to 2 slip days on the final report/repository submission.

*We will be releasing an outline template for the final report in the template repository on* {{page.full_spec}}*.*

### 4\. Team Member Assessment (due {{page.deadlines.final}})

This will be a short survey (submitted with your final submission) assessing you and your teammates contributions to the project. Each member will make an individual submission which is **anonymous** to your teammates.

[Jump to Top](#top)

---

## Grading

The final project is **optional**; if you submit it, it can count for up to [10% of your final grade]({{site.baseurl}}/syllabus). Note for Fall 2024, you will still need to take the final exam, so please take this into consideration when deciding whether to do this team project.

The final project is worth 80 points:

* Initial Team Declaration Form \[2 points\]
* Checkpoint \[15 Points\]
* Final Report and Submission \[60 points\]
  * Report Structure, Writing, and Content \[15/60 points\]
  * Tasks and Analysis \[45/60 points\]
* Final Peer Assessment Form \[3 points\]

A reasonable report would follow the provided scaffold in the template repository. A more detailed rubric will be provided closer to the checkpoint.

[Jump to Top](#top)

---

## Academic Integrity and Collaboration Policy

The final project is intentionally open-ended. As such there is no “correct answer”, which means **you are encouraged to discuss and share approaches** **and tips** with students in this class. **However, you may not directly cop**y large amounts of written work or SQL queries that will be components of your final report.

You must:

* Cite any sources when using code that was not generated by your or your teammates.
* You should cite code in your GitHub repository using code comments.


You may:

* Share code snippets on the relevant Ed threads, especially if they are related to tasks indirectly covered in class, like installation of tools, using psycopg, etc.
* Use generative AI tools to ask high level questions, generate ideas and help debug code.
* Use generative AI tools to help *edit* your writing, catch typos, improve clarity, etc.

You must not:

* Directly use generative AI tools to write portions of your written report.
* Copy entire queries from other students or online resources.
* Outsource your analysis to anyone other than members of your team.

[Jump to Top](#top)

---

## Working in Groups

Here are some tips for working in your project groups. Usually, the best way to resolve any concerns with your group members is through proactive, direct, and considerate communication\!

Most of the below tips are based on the collective wisdom of Data Science final project courses:

* Start a group chat and make sure everyone knows to check it regularly.
* Consider meeting in person rather than online: students have told us that this tends to be more productive and efficient, and more fun too.
* Don’t be afraid to reach out to course staff and come to office hours early if your group is struggling to set up systems or select/clean/load in data. You’ll likely be able to get more focused help at instructor **content** office hours.
* Even if you divide up the work, it’s often helpful to have all group members contribute to brainstorming, reviewing results, and discussing how best to write up the report.
* If you have concerns with your group members, communicate them earlier: don’t wait until the last minute\! It’s much easier to resolve issues and improve collaboration early than the night before the deadline.
* As part of the checkpoint, we’ll ask each individual how your project is going. While we won’t share your comments directly with anyone else in your group, course staff will reach out to any groups that raise issues, so that we can help you resolve them and work productively with your group.

[Jump to Top](#top)

---

## FAQ

<details>
  <summary>Should I do the final project?</summary>

  <p>Because we have a final exam for all students this semester, we recommend that you only do this optional final project if you have the capacity and motivation in this upcoming month to work in a team and produce a good report and solid results.</p>

  <p>If you are worried about your midterm grade, come talk to us. We’ll recommend some tips for studying for the final exam. If you would like to include this project on your resume, go for it. This project page (and the template repository) will be up past the end of the semester, so we recommend this as a reasonable personal project, say, over winter break, if that’s when you have more capacity.</p>
</details>

<details>
  <summary>Can the final project lower my grade?</summary>

  <p>No. We will compute the maximum of both grading options in the class. See the <a href="https://data101.org/fa24/syllabus/">Syllabus</a> for more information.</p>
</details>

<details>
  <summary>
    Can I be on a team of less than 3 people?
  </summary>

  <p>
    No.
  </p>
</details>

<details>
  <summary>
    What if I decide not to do the final project?
  </summary>

  <p>
    Please let us (via instructors, cc staff email <a href="mailto:data101@berkeley.edu">data101@berkeley.edu</a>) AND your group know ASAP.
  </p>
</details>

<details>
  <summary>
    How do slip days work?
  </summary>

  <p>
    Each person may use up to <b>2 slip days</b> each on the checkpoint and the final report/repository submission. Slip days will be handled <b>individually</b> at the end of the semester. For example, if your team submits the checkpoint with 1 slip day and the final submission with 2 slip days, then each person gets a 3 slip day deduction from their total remaining slip days. This means that late penalties may be applied differently per team member.
  </p>
</details>

<details>
  <summary>
    Can I make our team repository public after the end of the semester?
  </summary>

  <p>
    We may reuse parts of this final project for next semester, so <b>we prefer that you keep your project repositories private</b>. However, you should definitely feel free to publicly share your team’s written report, provided that all your team members consent! One suggestion is to make an empty GitHub repository that holds your report PDF, with a README.md that tells people who come across your repository that code is available privately upon request.
  </p>
</details>

<details>
  <summary>
    Can I get project help during office hours?
  </summary>

  <p>
    We can offer general design and debugging tips during office hours, but we likely won't be able to help debug specific code. Instructors have opened up project office hours; please check the office hour calendar for more information.
  </p>
</details>

[Jump to Top](#top)

---

## Acknowledgments

Select wording for the specifications (in particular, the entirety of “Working in Groups” and many components of the Grading Rubric) are drawn from the Data 102: Inference and Decision-Making ([https://data102.org/](https://data102.org/)) Final Project.
