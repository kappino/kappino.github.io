---
title: "How CARE prioritizes decisions in ROS2"
date: "2026-09-29"
category: "Robotics"
topic: "Robotics"
tags: ["ROS2", "Python", "GoRules JDM", "PNRR Age-IT"]
excerpt: "A reminder comes due during a cognitive exercise. Follow the decision from GoRules tables to the ROS2 coordinator."
author: "Crescenzo Esposito"
---

## A medication reminder arrives during an exercise

Consider a cycle in which a cognitive exercise is already running and a scheduled medication reminder becomes due. This is a walkthrough reconstructed from the planner and its decision tables. The useful question is what each part of the system does with the same snapshot of state.

## Why split the decision in two?

We originally chose visual decision tables so clinicians and other nontechnical staff could update rules and therapy settings without editing the ROS2 code. The demo used a fixed set of rules for standard scenarios. The planner fetched scheduled therapies, measurements and cognitive exercises from the backend APIs, shaped them into the input for Zen Engine and evaluated the same `medicine9.json` graph against that data.

The GoRules graph evaluates eligibility. Its medication table checks the schedule, snooze offset and pending state. In the reminder window it can emit `REMIND_FARMACO`. Once the deadline passes, a still-pending entry can instead yield `ESCALATE`. The exercise table can independently return `WAIT` for an exercise already in progress. An expression node gathers the outputs into separate lists.

The Python ROS2 planner then coordinates those outputs. Keeping eligibility in the graph makes the rules visible together. Keeping state changes and message publication in the planner makes it possible to trace which result became a command.

## What happens in that cycle?

| Output of the graph | What the planner does |
| --- | --- |
| Exercise returns `WAIT` | Waits for feedback and holds optional activities. |
| Medication returns `REMIND_FARMACO` | Sets a snooze offset and includes the reminder in the command list sent to the coordinator. |
| A still-pending medication later returns `ESCALATE` | Sends a command addressed to the caregiver integration. |

The exercise can remain in progress while the reminder is dispatched. The code shows that the command is published to the coordinator. Delivery to a person would need to be checked separately.

[CARE project and architecture](/projects/proj-care-decision-planner)
