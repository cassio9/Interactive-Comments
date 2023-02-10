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

//sort the comments
export function compare(a: any, b: any) {
	if (a.props.score <= b.props.score) {
		return 1;
	}
	if (a.props.score > b.props.score) {
		return -1;
	}
	return 0;
}
