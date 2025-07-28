# Design Document

## Overview

The AI Mentor Integration system enhances existing learning commands (`lct learn`, `lct hint`) with structured metadata and contextual markers that enable AI assistants to automatically adopt an expert teaching persona. The system uses invisible metadata blocks and structured output formatting to provide rich context while maintaining backward compatibility with existing functionality.

## Architecture

### Core Components

1. **AI Context Injector** - Adds structured metadata to learning command outputs
2. **Mentor Persona Trigger** - Special markers that signal AI assistants to switch roles
3. **Enhanced Learning Output** - Enriched command outputs with teaching context
4. **Backward Compatibility Layer** - Ensures existing functionality remains unchanged

### Data Flow

```
User runs learning command → Enhanced output with AI markers → AI detects markers → AI switches to Algorithm Mentor role → AI provides contextual teaching
```

## Components and Interfaces

### AI Context Injector

**Purpose:** Inject structured metadata into learning command outputs that AI assistants can parse

**Interface:**
```javascript
class AIContextInjector {
  injectMentorContext(problemData, commandType, hintLevel = null)
  formatForAIDetection(contextData)
  createMentorTrigger(problemName, difficulty, patterns)
}
```

**Key Methods:**
- `injectMentorContext()` - Adds AI-readable metadata to command output
- `formatForAIDetection()` - Formats context in a way AI assistants can easily parse
- `createMentorTrigger()` - Creates the special trigger that activates mentor mode

### Enhanced Learning Commands

**Modified Commands:**
- `lct learn [problem]` - Enhanced with AI mentor context
- `lct hint [problem] [level]` - Enhanced with progressive learning context

**Output Structure:**
```
[Normal human-readable output]

<!-- AI_MENTOR_CONTEXT_START -->
{
  "trigger": "ALGORITHM_MENTOR_MODE",
  "problem": {
    "name": "two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "category": "Hash Table",
    "patterns": ["Two Pointers", "Hash Map"]
  },
  "learning_context": {
    "command_type": "learn|hint",
    "hint_level": 1,
    "available_approaches": [...],
    "key_concepts": [...],
    "related_problems": [...]
  },
  "teaching_guidance": {
    "focus_areas": [...],
    "common_mistakes": [...],
    "pedagogical_notes": [...]
  }
}
<!-- AI_MENTOR_CONTEXT_END -->
```

### Mentor Persona System

**AI Detection Pattern:**
- AI assistants scan for `<!-- AI_MENTOR_CONTEXT_START -->` markers
- Parse JSON metadata to understand learning context
- Automatically adopt Algorithm Mentor persona
- Use structured data to provide targeted instruction

**Mentor Persona Characteristics:**
- Expert-level algorithmic knowledge
- Pedagogical teaching approach
- Focus on understanding over memorization
- Progressive disclosure of concepts
- Socratic questioning method

## Data Models

### Problem Context Model
```javascript
{
  name: string,           // kebab-case problem identifier
  title: string,          // Human-readable title
  difficulty: string,     // Easy|Medium|Hard
  category: string,       // Algorithm category
  patterns: string[],     // Applicable patterns
  timeComplexity: string, // Big O notation
  spaceComplexity: string,// Big O notation
  keyInsights: string[],  // Core learning points
  commonMistakes: string[],// Typical errors
  relatedProblems: string[] // Similar problems
}
```

### Learning Context Model
```javascript
{
  commandType: string,    // "learn" | "hint"
  hintLevel: number,      // Current hint progression
  availableApproaches: ApproachData[],
  focusAreas: string[],   // What to emphasize
  pedagogicalNotes: string[] // Teaching guidance
}
```

### AI Mentor Trigger Model
```javascript
{
  trigger: "ALGORITHM_MENTOR_MODE",
  problem: ProblemContext,
  learning_context: LearningContext,
  teaching_guidance: TeachingGuidance
}
```

## Error Handling

### Graceful Degradation
- If AI context injection fails, commands work normally
- Missing problem data doesn't break existing functionality
- Invalid JSON in AI context is ignored by human users

### Error Scenarios
1. **Problem not found in database** - Provide generic learning context
2. **Malformed AI context** - Fall back to standard output
3. **Missing metadata** - Generate minimal viable context

## Testing Strategy

### Unit Tests
- Test AI context injection with various problem types
- Verify JSON structure validity
- Test backward compatibility with existing commands

### Integration Tests
- Test full learning command flow with AI context
- Verify AI assistants can parse context correctly
- Test hint progression with AI metadata

### AI Assistant Tests
- Verify AI assistants detect mentor triggers
- Test persona switching behavior
- Validate teaching quality with structured context

### Backward Compatibility Tests
- Ensure existing users see no changes in output
- Verify command performance isn't impacted
- Test with various terminal environments

## Implementation Notes

### Invisible Integration
- AI context is embedded in HTML comments, invisible to terminal users
- JSON structure is compact to minimize output bloat
- Context injection is optional and fails gracefully

### Performance Considerations
- AI context generation should add minimal overhead
- Metadata is generated only when commands are run
- No persistent storage required for AI context

### Extensibility
- System designed to support additional learning commands
- Context structure can be extended for new AI capabilities
- Mentor persona can be enhanced with additional teaching methods