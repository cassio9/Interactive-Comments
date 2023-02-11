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
