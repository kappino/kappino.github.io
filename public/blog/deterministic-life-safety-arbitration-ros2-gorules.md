---
title: "How CARE prioritizes decisions in ROS2"
date: "2026-09-29"
category: "Robotics & Real-Time Systems"
topic: "Robotics"
tags: ["ROS2", "Robotics", "GoRules JDM", "PNRR Age-IT", "Real-Time", "Life-Safety", "C++"]
excerpt: "Decision tables and priority rules for resolving competing events in an assistive robot."
author: "Crescenzo Esposito"
---

## When a routine task and a reminder compete

In the PNRR Age-IT project, the CARE assistive robot had to handle scheduled medication reminders alongside routine activities. A reminder can be acknowledged, snoozed or escalated after a timeout. These outcomes need to be explicit so a developer can trace why a task was selected or deferred.

## My contribution

I developed the decision engine and Priority Resolver and authored the ROS2 package `care_planner`. I moved decision rules from a Rete-based implementation to GoRules JDM tables. A table makes the conditions and policy easier to inspect. The resolver manages priority and timer state across events.

## Decision flow

1. A ROS2 event reaches the planner.
2. The decision table evaluates the event and selects the applicable action.
3. The resolver applies priority and tracks the reminder, including timeout and escalation.

The integration provided a way to exercise the policy in the CARE prototype. A timing claim would require traces for each stage, from receipt of the ROS2 event through policy evaluation to dispatch of the selected action.

[CARE project and architecture](/projects/proj-care-decision-planner) · [Research appointment](/experience)
