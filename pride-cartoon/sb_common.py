# Общие описания стиля, персонажей и локаций (вынесено из legacy/build_storyboard_v1_multicut.py)
STYLE_IMG = ("Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, "
             "large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, "
             "35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, "
             "soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.")
STYLE_VID = ("Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary "
             "motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. "
             "No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.")

CH = {
 "BOSS":    ("Woman_in_tweed_jacket_smiling", "BOSS, a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons"),
 "GLASSES": ("Man_sitting_at_desk", "GLASSES, a man with voluminous swept-back brown hair, rectangular dark-framed glasses, light stubble and a short goatee, black suit jacket, white open-collar shirt"),
 "VEST":    ("Man_standing_in_corridor", "VEST, a man with short dark side-parted hair, strong eyebrows, short beard, intense serious gaze, dark brown waistcoat over a white shirt"),
 "SMILE":   ("Man_sitting_in_cozy_cafe", "SMILE, a cheerful man with short blond-brown hair, round face and a big toothy grin, brown blazer over a black t-shirt"),
 "BLONDE":  ("Woman_sitting_at_wooden_table", "BLONDE, a woman with long straight blonde hair, blue eyes, calm smile, fitted dark chocolate-brown long-sleeve top, thin long silver necklace"),
 "BEARD":   ("Man_sitting_on_red_chair", "BEARD, a man with light-brown hair with a soft forward fringe, blue-grey eyes, full short brown beard, navy suit jacket, white open shirt, chunky silver watch"),
 "ROUND":   ("Man_smiling_wearing_blazer", "ROUND, a man with short dark textured hair, round thin metal-frame glasses, thick dark beard with grey streaks, black blazer with grey lapel trim, white t-shirt"),
 "SPEAKER": ("Man_speaking_on_stage", "SPEAKER, a man with short dark hair and a receding hairline, rectangular black glasses, stubble, navy suit, white shirt"),
 "BALD":    ("Man_speaking_into_microphone", "BALD, a bald man with light blue eyes, clean-shaven round face, black suit, white shirt, bright red pocket square"),
}
LOC = {
 "BLUE_EXT": "a small cozy one-storey wooden house painted soft sky blue with white window frames and a tiny porch, on a quiet green street",
 "BLUE_INT": "the interior of the small blue house (one cozy room with three old wooden desks, a desk lamp, cardboard boxes, a cork board with blank paper sketches, warm light through small white-framed windows)",
 "RED_EXT":  "a large modern two-storey house painted deep red, big warm-lit windows, dark walnut wood details and black metal frames",
 "RED_INT":  "the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows)",
}

def ch(*names): return "; ".join("{} ({})".format(*CH[n][1].split(", ",1)) for n in names)
