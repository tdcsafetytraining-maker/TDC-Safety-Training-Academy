import type { CourseLanguage, CourseLesson } from './course-catalog';

const lesson = (slides: Array<[string,string,string]>, quiz: CourseLesson['quiz']): Record<CourseLanguage, CourseLesson> => {
  const built: CourseLesson = { slides: slides.map(([title,text,ref], i) => ({ n: String(i + 1).padStart(2, '0'), title, text, ref })), quiz };
  return { en: built, ar: built, ur: built, hi: built };
};

export const materialStorageCourse = lesson([
  ['Plan the storage area','Use level, load-bearing ground; verify floor and rack capacity; keep emergency routes, fire equipment, panels and access ways clear. Segregate pedestrians from forklifts and delivery vehicles. A competent person must address unstable ground, excavations and overhead hazards before unloading.','29 CFR 1926.250(a); 1926.34'],
  ['Stack to prevent sliding or collapse','Stack, block, interlock and limit pile height so material remains stable under expected handling, wind and vibration. Remove material in reverse order without undercutting. Do not climb piles or use damaged pallets. Secure round stock with chocks or wedges.','29 CFR 1926.250(a)(1); 1926.250(b)'],
  ['Keep clear of openings and edges','Inside buildings, do not store material within 6 ft (1.8 m) of a hoistway or floor opening, or within 10 ft (3.1 m) of an exterior wall that does not extend above the material. Do not overload floors; post safe load limits where required.','29 CFR 1926.250(b)(1); 1926.250(a)(2)'],
  ['Store bagged, brick and block material correctly','Step back bagged material when piles exceed 5 ft. Taper masonry piles above 4 ft; brick stacks may not exceed 7 ft and must taper above 4 ft. Lumber stacks must be stable, on level supports and generally no more than 16 ft when manually handled or 20 ft when handled mechanically.','29 CFR 1926.250(b)(4)–(9)'],
  ['Control steel, pipe and cylindrical stock','Rack or block reinforcing steel, pipe, conduit and bar stock so it cannot spread, tilt or roll. Use end stops and chocks; keep hands out of pinch points. Never remove a lower piece that supports the stack.','29 CFR 1926.250(a)(1); 1926.250(b)(8)'],
  ['Segregate chemicals and compressed gases','Keep labels visible and follow the SDS for incompatibilities, temperature, ventilation and secondary containment. Secure cylinders upright, fit valve protection when not in use, and separate oxygen from fuel gas by 20 ft or an approved 5-ft, 30-minute fire barrier.','29 CFR 1926.350(a); 1926.59'],
  ['Use safe mechanical handling','Inspect pallets, racks, slings and forklifts before use. Stay within rated capacity, center loads, use a spotter where vision is blocked and establish an exclusion zone. Never stand under a suspended load or between a load and fixed object.','29 CFR 1926.250(a); 1926.251; 1926.602'],
  ['Inspect and correct daily','Inspect storage areas for leaning stacks, damaged racks, missing chocks, blocked aisles, spills and fire loading. Barricade the area and restack with suitable equipment; do not attempt to catch or hand-straighten a collapsing load.','29 CFR 1926.25; 1926.250'],
],[
  {q:'How close may material be stored to a floor opening inside a building?',a:['2 ft','Not within 6 ft','Exactly 10 ft','Any distance with a sign'],correct:1},
  {q:'What is required for round stock?',a:['Paint only','A warning label only','Chocks, wedges or a rack that prevents rolling','Stack on loose soil'],correct:2},
  {q:'What should you do with a leaning unstable stack?',a:['Pull one lower item out','Climb it to straighten the top','Ignore it until shift end','Isolate it and restack with suitable equipment'],correct:3},
  {q:'What is the normal separation between oxygen and fuel-gas cylinders in storage?',a:['20 ft or an approved 5-ft fire barrier','3 ft only','No separation','One wooden pallet'],correct:0},
  {q:'Who may stand under a suspended material load?',a:['The signaler','No one','A trained rigger','Anyone wearing a hard hat'],correct:1},
]);

export const permitToWorkCourse = lesson([
  ['A permit is a control—not permission to ignore hazards','OSHA does not prescribe one universal construction permit-to-work form. TDC uses a written PTW system to coordinate defined high-risk work. The permit records scope, place, time, hazards, controls and responsible persons; it does not replace the applicable OSHA procedure.','29 CFR 1926.20; site PTW program'],
  ['Use the correct permit type','Select the task permit: hot work, confined-space entry, excavation, electrical/energized work, lifting, line breaking or other project category. Simultaneous activities may need linked permits and one controlling authority.','1926.1205; 1926.352; applicable subparts'],
  ['Inspect the exact job site','The issuer and receiver walk down the location. Confirm equipment identity, boundaries, access, nearby work, weather, underground/overhead services, energy sources and emergency arrangements. Never issue from a desk using yesterday’s conditions.','29 CFR 1926.20(b)(2)'],
  ['List isolations and verify zero energy','Identify every energy source and isolation point. Lock, tag, blank, disconnect, vent, drain or block as required, then verify the safe state using the approved test method. A tag alone is a warning, not physical isolation.','29 CFR 1926.417; applicable 1910.147'],
  ['Record controls and acceptance criteria','State measurable controls: gas-test limits, fire watch, barriers, PPE, rescue, grounding, excavation protection, lifting plan and competent/qualified persons. If a condition cannot be verified, the permit cannot be released.','1926.1205; 1926.352'],
  ['Brief every person and display the permit','The performing supervisor explains scope, hazards, controls, stop-work triggers and emergency actions to the crew. Workers sign or are otherwise recorded as briefed. Keep the permit available at the work location.','29 CFR 1926.21(b)(2); site rule'],
  ['Suspend when conditions change','Stop and suspend for alarm, weather change, gas-test failure, scope/location/crew change, isolation disturbance, simultaneous-work conflict or expired time. Make the area safe; reassess and revalidate or issue a new permit.','1926.1205(e); site rule'],
  ['Close, hand back and audit','On completion, remove people, tools and waste; replace guards; confirm system integrity; cancel linked permits; and obtain issuer/receiver handback. Only authorized persons remove isolations. Retain records per project procedure and review defects.','29 CFR 1926.20; site rule'],
],[
  {q:'What does a PTW replace?',a:['Training','The applicable OSHA procedure','Nothing; it coordinates and records controls','Supervision'],correct:2},
  {q:'When conditions or scope change, what is required?',a:['Continue until break','Suspend, make safe and revalidate or reissue','Erase the change','Let one worker decide'],correct:1},
  {q:'What must happen before release?',a:['Measurable controls and isolations are verified','Only the form title is completed','The crew starts early','A photo is taken'],correct:0},
  {q:'Where should the permit be available?',a:['At head office only','In the issuer’s vehicle','At the work location','Only after completion'],correct:2},
  {q:'Who may remove an isolation?',a:['Any worker finishing early','Only an authorized person under the procedure','The nearest operator','A visitor'],correct:1},
]);

export const barriersSignsCourse = lesson([
  ['Match the device to the hazard','Signs warn of hazards; barricades physically define or restrict an area; barriers resist entry or a load. Select the device after assessing severity, exposure, duration, visibility and whether the public is affected. Tape alone is not fall protection.','29 CFR 1926.200–1926.203'],
  ['Use the correct sign class','DANGER indicates immediate danger requiring special precautions. CAUTION warns of a potential hazard or unsafe practice. Safety instruction signs give general safety direction. Accident-prevention signs must be visible while the hazard exists and removed or covered when it no longer applies.','29 CFR 1926.200(b)–(f)'],
  ['Make messages understandable','Use a clear signal word, recognized symbol and short action message in languages the workforce understands. Place signs before the decision point, at normal eye level where practical, illuminated at night and not hidden by doors, equipment or dust.','29 CFR 1926.200(g); 1926.21(b)(2)'],
  ['Build a complete exclusion zone','Set the boundary far enough from falling objects, swing radius, traffic, excavation edges, pressure tests or line-of-fire hazards. Control every approach, including stairs and lower levels. Provide a guarded alternate route and an attendant when conditions require.','29 CFR 1926.200; 1926.201'],
  ['Use traffic controls consistently','Use trained flaggers, advance warning, channelizing devices, lighting and high-visibility garments according to the approved traffic-control plan. Drivers must have enough distance to see, decide and stop. Never stand in the vehicle path.','29 CFR 1926.201(a); Part VI MUTCD'],
  ['Inspect after change or impact','At each shift and after wind, vehicle contact, relocation or work change, check stability, visibility, lights, gaps and safe access. Replace faded, damaged or contradictory devices immediately.','29 CFR 1926.20(b)(2); 1926.200'],
  ['Do not cross without authorization','A barricade means stop and obtain permission. Never move a device for convenience. The responsible person confirms controls before access and restores the boundary immediately after authorized passage.','29 CFR 1926.200; site rule'],
  ['Remove only when the hazard is controlled','The responsible authority verifies the work is complete, openings are protected, energy is safe and routes are restored before removing signs or barriers. Leaving obsolete warnings reduces trust and creates confusion.','29 CFR 1926.200(a)'],
],[
  {q:'What does a DANGER sign indicate?',a:['Immediate danger requiring special precautions','General information','A completed job','A lunch area'],correct:0},
  {q:'Can warning tape serve as a guardrail?',a:['Always','Only indoors','No','Only when red'],correct:2},
  {q:'When should signs be removed?',a:['At shift end','Only after the hazard is controlled','When they become dirty','Before inspection'],correct:1},
  {q:'What must an exclusion zone control?',a:['Only the main entrance','Every approach, including lower levels where exposed','Only vehicle access','Only managers'],correct:1},
  {q:'When are barricades inspected?',a:['Once per project','At each shift and after change or impact','Only after an incident','Never'],correct:1},
]);

export const floorOpeningCourse = lesson([
  ['Identify holes and openings','A hole is a gap or void 2 in (5.1 cm) or more in its least dimension in a floor, roof or other walking-working surface. An opening is a wall gap at least 30 in high and 18 in wide through which a worker can fall. Mark them on plans and inspect before work.','29 CFR 1926.500(b)'],
  ['Protect floor holes immediately','Protect each employee from falling through holes more than 6 ft above a lower level with a personal fall-arrest system, cover or guardrail around the hole. Protect against tripping or objects falling through even where the fall distance is less.','29 CFR 1926.501(b)(4)'],
  ['Build covers strong enough','A cover must support at least twice the maximum axle load of the largest vehicle expected to cross it, or for other covers twice the combined maximum weight of employees, equipment and materials that may be imposed at one time.','29 CFR 1926.502(i)(1)–(2)'],
  ['Secure and mark every cover','Install covers so wind, equipment or employees cannot accidentally displace them. Color-code or mark them “HOLE” or “COVER” to warn of the hazard. A loose sheet of plywood is not an acceptable cover.','29 CFR 1926.502(i)(3)–(4)'],
  ['Use compliant guardrails','Top edge height is 42 in (1.1 m), plus or minus 3 in. Install a midrail about halfway when there is no wall or parapet at least 21 in high. Systems must meet strength and opening criteria; do not use plastic tape as a rail.','29 CFR 1926.502(b)'],
  ['Prevent falling objects','Use toeboards, screens, canopies, guardrails or barricades where people below may be struck. Keep material back from edges and never sweep debris into an opening unless a protected chute and controlled area are provided.','29 CFR 1926.501(c); 1926.502(j); 1926.252'],
  ['Control temporary removal','Only an authorized person may remove a cover or rail. Before removal, establish alternate fall protection and barricade the area. Replace protection immediately when the task pauses or ends.','29 CFR 1926.501; 1926.502'],
  ['Inspect and stop work','Inspect at shift start and after concrete work, deliveries, weather or trade interference. Stop for an unmarked, loose, damaged, undersized or moved cover, missing rail, or an exposed person below.','29 CFR 1926.20(b)(2); 1926.501'],
],[
  {q:'What minimum size is a floor hole under Subpart M?',a:['1 in','2 in in its least dimension','6 in','18 in'],correct:1},
  {q:'How strong must a non-vehicle cover be?',a:['Worker weight only','500 lb','Twice the maximum combined load that may be imposed','No rating if marked'],correct:2},
  {q:'What must a cover be marked?',a:['HOLE or COVER','SAFE','TDC only','No marking'],correct:0},
  {q:'What is the normal guardrail top-edge height?',a:['30 in','36 in','42 in ±3 in','48 in exactly'],correct:2},
  {q:'Before temporarily removing a cover, what is required?',a:['A verbal warning only','Alternate protection and a controlled area','Nothing under 10 minutes','Only gloves'],correct:1},
]);

export const toolboxTalkCourse = lesson([
  ['Use talks to prepare for today’s work','A toolbox talk is a short, focused crew discussion before a task or when conditions change. OSHA requires instruction in recognizing and avoiding hazards but does not prescribe one universal daily frequency or fixed duration. TDC may require daily talks as a site rule.','29 CFR 1926.21(b)(2); site rule'],
  ['Choose a job-specific topic','Base the talk on the day’s tasks, JSA, permits, weather, interfaces, recent changes, near misses and lessons learned. Avoid repeating generic slogans while an actual site hazard goes undiscussed.','29 CFR 1926.20(b); 1926.21(b)(2)'],
  ['Prepare three clear outcomes','Workers should leave knowing: what can hurt them, the exact controls and limits, and when to stop and report. Include measurements, equipment limits, responsible roles and emergency actions that apply that day.','29 CFR 1926.21(b)(2)'],
  ['Make the crew participate','Ask workers to point out hazards, demonstrate controls and answer scenario questions. Use plain words, examples and a language/vocabulary they understand. Reading a sheet without checking understanding is not effective training.','29 CFR 1926.21(b)(2)'],
  ['Check competence—not attendance only','Ask open questions and observe a worker explain or demonstrate the safe step. Correct misunderstandings immediately. An attendance signature records presence; it does not prove competence.','29 CFR 1926.21(b)(2)'],
  ['Record essential details','Record date/time, project/location, topic, task and hazards, presenter, attendees, language, questions or actions raised and close-out owner. Never sign for an absent person or backdate a record.','Site training-control rule'],
  ['Repeat when the risk changes','Give a new briefing after scope, crew, equipment, method, weather, permit, access or adjacent activity changes, and after an incident or observed knowledge gap. Stop work until affected people understand the revised controls.','29 CFR 1926.21(b)(2)'],
  ['Escalate unresolved concerns','A toolbox talk does not authorize unsafe work. If a worker identifies an uncontrolled hazard, pause the task, notify the supervisor and revise the JSA/permit/control before starting. Close actions and tell the crew what changed.','29 CFR 1926.20; site stop-work rule'],
],[
  {q:'Does OSHA set one universal toolbox-talk duration?',a:['Exactly 5 minutes','Exactly 15 minutes','No','Exactly 30 minutes'],correct:2},
  {q:'What three outcomes should workers know?',a:['Hazard, controls/limits, and stop/report triggers','Only the topic title','Names of managers','Payroll dates'],correct:0},
  {q:'What does an attendance signature prove?',a:['Full competence','Presence only','Practical qualification','Permit approval'],correct:1},
  {q:'When should the talk be repeated?',a:['Only yearly','When risk, work or conditions change','Never after training','Only after an injury'],correct:1},
  {q:'What happens to an unresolved hazard?',a:['Start slowly','Ignore it','Pause, escalate and control it before work','Record it after completion'],correct:2},
]);

export const manualHandlingCourse = lesson([
  ['Plan the move before touching the load','Check weight, size, shape, stability, sharp/hot surfaces, grip points, route, stairs, lighting and destination. Clear the path and decide whether a trolley, hoist, forklift, team lift or load breakdown is needed.','29 CFR 1926.21(b)(2); 1926.250(a)(1)'],
  ['There is no universal OSHA lifting-weight limit','OSHA construction rules do not set one maximum manual-lift weight for every worker and task. Risk depends on reach, height, frequency, twisting, travel distance, grip and individual capability. Follow the project ergonomic assessment and ask for help whenever control is uncertain.','OSHA ergonomics guidance; OSH Act General Duty Clause'],
  ['Use mechanical assistance first','Use carts, dollies, pallet jacks, hoists, lift tables and forklifts where practical. Inspect the aid, verify capacity, secure the load and keep hands/feet out of pinch points. Only trained authorized persons operate powered equipment.','29 CFR 1926.250; 1926.602'],
  ['Set a stable lifting position','Stand close with feet apart, test the load, keep a secure grip and maintain the natural curve of the back. Lift smoothly using legs and hips; avoid jerking. Keep the load close between about knee and shoulder height where practical.','OSHA safe lifting guidance'],
  ['Do not twist under load','Turn by moving the feet, not rotating the trunk. Avoid one-handed carries, long reaches and obstructed vision. Set the load down on a stable surface without placing fingers underneath.','OSHA ergonomics guidance'],
  ['Coordinate team lifts','Choose one leader and agree on commands: ready, lift, walk, stop and lower. Match workers by position, keep the load level and stop immediately if anyone loses grip or balance. A team lift does not fix a load that needs mechanical equipment.','29 CFR 1926.21(b)(2)'],
  ['Control repetitive and awkward work','Reduce frequency, shorten carry distance, rotate tasks appropriately, adjust work height and use handles or smaller containers. Take planned recovery breaks and report early symptoms such as pain, numbness, tingling, weakness or swelling.','OSHA ergonomics guidance'],
  ['Stop for unsafe conditions or symptoms','Do not lift a load that is unknown, unstable, leaking, too bulky to see around, beyond assessed capability or on an unsafe route. Lower safely, isolate if needed and obtain the correct aid. Report injuries promptly; do not work through worsening pain.','29 CFR 1926.21(b)(2); site rule'],
],[
  {q:'What is OSHA’s universal maximum manual-lift weight?',a:['15 kg','23 kg','50 kg','There is no single universal limit'],correct:3},
  {q:'What is the preferred first control for a difficult load?',a:['Lift faster','Mechanical assistance or redesign','Twist while lifting','Hold it away from the body'],correct:1},
  {q:'How should direction be changed under load?',a:['Twist the trunk','Move the feet','Lean backward','Use one hand'],correct:1},
  {q:'What does a team lift require?',a:['One agreed leader and coordinated commands','Everyone gives commands','No route check','The tallest person alone'],correct:0},
  {q:'What should a worker do with worsening pain or numbness?',a:['Hide it','Lift through it','Stop and report promptly','Use a heavier load'],correct:2},
]);

