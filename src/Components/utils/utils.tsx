// turns comment in editable text, focus
export const editComment = (RefValue: React.RefObject<HTMLInputElement>) => {
	if (RefValue.current) {
		RefValue.current.setAttribute("contenteditable", "true");
		RefValue.current.focus();
	}
};

//blur when Enter key is pressed
export const BlurOnEnterKey = (
	e: React.KeyboardEvent<HTMLParagraphElement>,
	RefValue: React.RefObject<HTMLInputElement>
) => {
	if (e.key === "Enter") {
		if (RefValue.current) {
			RefValue.current.blur();
		}
	}
};
