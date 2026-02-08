# Seesaw Challenge 🎪

An interactive physics-based seesaw simulator. Drop balls with different weights and watch the plank tilt based on torque calculations.

## How to Use

1. Move mouse over the plank to see a preview ball
2. Click to drop the ball at that position
3. Plank tilts based on weight distribution
4. Stats show rotation angle and weight per side
5. Reset button clears everything

## Design Decisions

**Ball Positioning**: Balls are children of the plank so they rotate with it.

**Animations**: CSS transitions for smooth drops.

**Torque Formula**: `Weight × Distance from center`. Positions stored once to keep math stable.

**Ghost Ball**: Shows next weight centered on the plank for easy preview.

**Rotation Limits**: Clamped between +30° and -30 to prevent extreme tilting.

## Trade-offs & Limitations

- **No physics engine** - Simplified torque, no realistic gravity/acceleration
- **No mobile support** - Built for desktop with mouse input
- **localStorage only** - Works for reasonable use
- **No individual ball deletion** - Reset clears all at once
- **Balls tilt with plank** - Realistic but not always visually ideal

## Tech Stack

Vanilla JavaScript, HTML, CSS, localStorage
