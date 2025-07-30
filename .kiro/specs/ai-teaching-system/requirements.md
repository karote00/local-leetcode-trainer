# Requirements Document

## Introduction

This feature will implement an AI-powered teaching system for the Local LeetCode Trainer that uses a Domain-Specific Language (DSL) to create intelligent, proactive coaching experiences. The system will enable AI agents to interpret user code, outputs, and behaviors to provide contextual guidance without requiring explicit help requests. This transforms the trainer from a static problem collection into an adaptive learning platform that can coach beginners and advanced users alike.

## Requirements

### Requirement 1

**User Story:** As a coding student, I want AI-guided learning sessions that proactively help me, so that I can learn effectively without knowing what questions to ask.

#### Acceptance Criteria

1. WHEN I start a problem THEN the system SHALL load the AI teaching script and provide contextual introduction
2. WHEN I write code THEN the system SHALL analyze my approach and provide proactive hints based on code patterns
3. WHEN I run my code THEN the system SHALL interpret outputs, errors, and results to provide targeted feedback
4. IF I make common mistakes THEN the system SHALL recognize patterns and guide me toward better solutions

### Requirement 2

**User Story:** As a problem creator, I want to define teaching scripts using YAML DSL, so that I can create structured learning experiences for each problem.

#### Acceptance Criteria

1. WHEN creating a teaching script THEN the system SHALL support YAML-based DSL with step definitions
2. WHEN defining steps THEN the system SHALL support intro, pre_prompt, on_run, after_success, on_request, and hint step types
3. WHEN setting triggers THEN the system SHALL support complex condition matching for code analysis and output interpretation
4. WHEN validating scripts THEN the system SHALL ensure proper YAML syntax and DSL compliance

### Requirement 3

**User Story:** As a learner, I want the AI to understand my code and provide relevant feedback, so that I can improve my problem-solving approach in real-time.

#### Acceptance Criteria

1. WHEN I write code THEN the system SHALL perform static code analysis to identify patterns and approaches
2. WHEN code runs THEN the system SHALL capture stdout, stderr, and execution results for analysis
3. WHEN analyzing outputs THEN the system SHALL match against trigger conditions to determine appropriate responses
4. WHEN providing feedback THEN the system SHALL deliver contextual, educational guidance based on current state

### Requirement 4

**User Story:** As a user, I want different types of AI interventions based on my progress, so that I receive appropriate guidance at each stage of problem-solving.

#### Acceptance Criteria

1. WHEN starting a problem THEN the system SHALL provide introductory guidance and problem context
2. WHEN I'm stuck THEN the system SHALL offer progressive hints based on my current approach
3. WHEN I make errors THEN the system SHALL provide specific debugging guidance based on error patterns
4. WHEN I succeed THEN the system SHALL provide congratulations and suggest next steps or optimizations

### Requirement 5

**User Story:** As a developer, I want the teaching system to integrate seamlessly with existing problem structure, so that I can enhance problems without breaking current functionality.

#### Acceptance Criteria

1. WHEN adding teaching scripts THEN the system SHALL maintain backward compatibility with existing problem format
2. WHEN problems lack teaching scripts THEN the system SHALL fall back to standard problem-solving mode
3. WHEN loading problems THEN the system SHALL automatically detect and load associated trainer.yaml files
4. WHEN running in teaching mode THEN the system SHALL preserve all existing functionality while adding AI guidance

### Requirement 6

**User Story:** As a learner, I want personalized learning experiences that adapt to my skill level, so that I can progress at an appropriate pace.

#### Acceptance Criteria

1. WHEN the system detects my skill level THEN it SHALL adjust hint frequency and complexity accordingly
2. WHEN I demonstrate understanding THEN the system SHALL reduce intervention and encourage independence
3. WHEN I struggle repeatedly THEN the system SHALL provide more detailed explanations and alternative approaches
4. WHEN tracking progress THEN the system SHALL learn from my patterns to improve future guidance