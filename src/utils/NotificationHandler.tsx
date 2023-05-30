import * as Notifications from "expo-notifications";

const myScheduleNotification = async (
	title: string,
	body: string,
	date: Date
) => {
	const existingNotifications =
		await Notifications.getAllScheduledNotificationsAsync();

	const isDuplicate = existingNotifications.some(
		(notification) => notification.content.body === body
	);

	if (isDuplicate) return;

	const triggerDate: any = new Date(date);
	const now: any = new Date();
	const seconds = Math.floor((triggerDate - now) / 1000); // Calculate the number of seconds between current time and the specified date

	await Notifications.scheduleNotificationAsync({
		content: {
			title: title,
			body: body,
			data: { data: "goes here" },
		},
		trigger: { seconds: seconds },
	});
};

export default myScheduleNotification;
