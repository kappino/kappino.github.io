---
title: "What do university surveys miss? Why I built UniReviews"
date: "2026-11-18"
category: "Backend and Data Modeling"
topic: "Systems"
tags: ["MongoDB", "Flask", "Esse3", "Higher Education"]
excerpt: "Post-exam feedback can help the next student prepare and help universities see which experiences keep coming up."
author: "Crescenzo Esposito"
---

## The question you can only answer after the exam

If I fill out a course survey before the exam, I can say whether the lectures were clear. Once I have taken it, I can explain whether the questions matched the syllabus, which materials actually helped, and where I underestimated the workload.

That gap led me to build UniReviews for my graduate databases course. I wanted students preparing for an exam to be able to compare experiences and ask follow-up questions. I also wanted academic staff to see whether a problem raised by one student appeared in other reviews.

UniReviews grew out of **ParthenoAnswer**, an undergraduate Web Technologies project I built with **Riccardo Aiello** and **Aniello Genovese**. ParthenoAnswer gave students a place to ask and answer questions about courses and already indicated when a contributor had passed the exam. I carried that idea into structured post-exam reviews and a dashboard for academic quality staff.

## What Esse3 verifies

The integration uses the Esse3 APIs to synchronize passed exams. When a student submits a review, UniReviews checks the course code against the synchronized record. A match earns the review a verification badge. The badge refers to the exam record, and readers can still weigh different opinions about the same exam.

Reviews in the prototype retain an author reference. Offering anonymous reviews would also require restricting which author fields the API exposes.

## From discussion to dashboard

A student wants to know why others found an exam difficult. A quality team might want to see whether those reports cluster in one course or recur across a degree programme. I built a dashboard that moves from department to degree programme to individual course and displays how review scores are distributed.

Voluntary participation affects whose experiences appear in the dashboard. I would use those patterns to decide where to follow up with students and instructors.

## How I populated the demo

To test the catalogue and dashboard with student-written text, I used a public dataset of University of Waterloo course reviews. The ETL matches Waterloo and Salerno course titles with an inverted word index that gives rarer terms more weight (IDF). It then maps the review text to Salerno course codes and loads it into MongoDB with synthetic authors. The text comes from Waterloo reviews. The Salerno mappings are demo data and do not represent evaluations collected at Salerno. [Course Reviews University of Waterloo dataset on Kaggle](https://www.kaggle.com/datasets/anthonysusevski/course-reviews-university-of-waterloo)

## A decision you can see in the database

I stored computed review statistics in the course document so the catalogue can read them directly. The review and its summary are written separately. If a write is interrupted halfway through, the summary can lag. That trade-off links how quickly people can browse the catalogue to how the application keeps the summary consistent.

[UniReviews data model, architecture, and benchmark](/projects/proj-unireviews)
