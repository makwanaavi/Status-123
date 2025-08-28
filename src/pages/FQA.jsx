import React from "react";

const faqs = [
	{
		question: "What is StatusApp?",
		answer: (
			<>
				<span className="font-semibold">StatusApp</span> is a vibrant platform
				where users can share, discover, and save creative status updates for
				social media, messaging apps, and more. Our community-driven approach
				ensures a diverse and ever-growing collection of statuses for every mood
				and occasion.
			</>
		),
	},
	{
		question: "How do I create a new status?",
		answer: (
			<>
				Simply click the <strong>Create</strong> button in the header. Write your
				status in the provided form and submit it to share with the community.
				You can also add tags and select a category to help others find your
				status easily.
			</>
		),
	},
	{
		question: "Can I save or bookmark statuses?",
		answer: (
			<>
				Absolutely! You can like and bookmark any status to save it for later.
				Access your saved statuses anytime from your profile page, making it easy
				to revisit your favorites.
			</>
		),
	},
	{
		question: "Is StatusApp free to use?",
		answer: (
			<>
				Yes, StatusApp is completely free for everyone. Sign up in seconds and
				start exploring, sharing, and saving statuses without any cost.
			</>
		),
	},
	{
		question: "How do I contact support?",
		answer: (
			<>
				Visit our{" "}
				<a
					href="/contact"
					className="text-pink-600 underline font-medium"
				>
					Contact
				</a>{" "}
				page to reach out to our support team. We're here to help with any
				questions, feedback, or issues you may have.
			</>
		),
	},
	{
		question: "Can I suggest new features?",
		answer: (
			<>
				We love hearing from our users! Please use the contact form to share your
				suggestions and ideas. Your feedback helps us improve and grow StatusApp.
			</>
		),
	},
	{
		question: "Is my data safe on StatusApp?",
		answer: (
			<>
				We take your privacy seriously. All your data is securely stored and never
				shared with third parties. You can manage your account and privacy
				settings from your profile.
			</>
		),
	},
	{
		question: "Can I delete my account?",
		answer: (
			<>
				Yes, you can delete your account at any time from your profile settings.
				All your data will be permanently removed from our servers.
			</>
		),
	},
	{
		question: "How do I edit a status after posting?",
		answer: (
			<>
				You can edit your status from your profile page. Just click the{" "}
				<strong>Edit</strong> icon next to your status, make changes, and save
				them instantly.
			</>
		),
	},
	{
		question: "Can I upload images or videos with my status?",
		answer: (
			<>
				Yes! StatusApp supports text, images, and short videos. When creating a
				status, simply upload media files along with your text.
			</>
		),
	},
	{
		question: "How do I follow other users?",
		answer: (
			<>
				Visit a user’s profile and click the <strong>Follow</strong> button.
				Their latest statuses will then appear in your feed.
			</>
		),
	},
	{
		question: "Can I share statuses on other platforms?",
		answer: (
			<>
				Of course! Each status has a <strong>Share</strong> option that lets you
				post directly to WhatsApp, Instagram, Facebook, and more.
			</>
		),
	},
	{
		question: "How do trending statuses work?",
		answer: (
			<>
				Trending statuses are selected based on likes, shares, and community
				engagement. The more interactions a status gets, the higher it ranks.
			</>
		),
	},
	{
		question: "Are there categories for statuses?",
		answer: (
			<>
				Yes, we organize statuses into categories like Love, Funny, Motivation,
				Friendship, and many more so you can easily find what you’re looking for.
			</>
		),
	},
	{
		question: "Can I report inappropriate content?",
		answer: (
			<>
				Absolutely. Each status has a <strong>Report</strong> button. Our team
				reviews reports quickly to maintain a safe community.
			</>
		),
	},
	{
		question: "Do I need an account to view statuses?",
		answer: (
			<>
				No, you can browse and explore public statuses without an account. But to
				create, like, or bookmark, you’ll need to sign up.
			</>
		),
	},
	{
		question: "Can I change my username?",
		answer: (
			<>
				Yes, you can update your username from your profile settings at any time.
			</>
		),
	},
	{
		question: "Is there a mobile app for StatusApp?",
		answer: (
			<>
				Yes! StatusApp is available on both iOS and Android. Download it from the
				App Store or Google Play for the best experience.
			</>
		),
	},
	{
		question: "Can I use StatusApp offline?",
		answer: (
			<>
				You’ll need an internet connection to browse and upload statuses. However,
				saved statuses can be viewed offline from your profile.
			</>
		),
	},
	{
		question: "How do I reset my password?",
		answer: (
			<>
				Go to the login page and click <strong>Forgot Password</strong>. Follow
				the steps to reset it via your registered email.
			</>
		),
	},
	{
		question: "Can I see who liked my status?",
		answer: (
			<>
				Yes, open your status and tap on the <strong>Likes</strong> count to view
				the list of users who liked it.
			</>
		),
	},
	{
		question: "Is there a limit on how many statuses I can post?",
		answer: (
			<>
				No limit! Post as many statuses as you want and share your creativity with
				the community.
			</>
		),
	},
	{
		question: "How do I change the language of the app?",
		answer: (
			<>
				Go to <strong>Settings</strong> and choose your preferred language. We
				support multiple regional and international languages.
			</>
		),
	},
	{
		question: "Does StatusApp show ads?",
		answer: (
			<>
				We keep ads minimal and non-intrusive. Premium users can enjoy an
				advertisement-free experience.
			</>
		),
	},
	{
		question: "Can I collaborate with other creators?",
		answer: (
			<>
				Yes, you can tag other creators in your statuses or co-create content
				through our collaboration feature.
			</>
		),
	},
	{
		question: "How do notifications work?",
		answer: (
			<>
				You’ll receive notifications when someone likes, comments, bookmarks, or
				shares your status. Customize alerts in your settings.
			</>
		),
	},
	{
		question: "Is there a premium membership?",
		answer: (
			<>
				Yes, StatusApp Premium offers an ad-free experience, exclusive templates,
				and advanced customization options.
			</>
		),
	},
	{
		question: "Can I recover deleted statuses?",
		answer: (
			<>
				Deleted statuses cannot be recovered once removed. Make sure before
				deleting, or save them offline if needed.
			</>
		),
	},
];

const FAQ = () => {
	return (
		<>
			<div className="bg-gradient-to-b from-white to-pink-50 min-h-screen py-12">
				<div className="container mx-auto w-full px-4">
					<div className="bg-white rounded-xl shadow-lg p-8">
						<h2 className="text-3xl font-extrabold text-pink-700 mb-6 text-center">
							Frequently Asked Questions
						</h2>
						<p className="text-gray-600 mb-8 text-center">
							Find answers to the most common questions about StatusApp. If you
							need more help, feel free to{" "}
							<a href="/contact" className="text-pink-600 underline">
								contact us
							</a>
							.
						</p>
						<div className="space-y-6">
							{faqs.map((faq, idx) => (
								<div key={idx} className="border-b pb-6">
									<h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
										<span className="mr-2 text-pink-600">Q{idx + 1}.</span>
										{faq.question}
									</h3>
									<p className="text-gray-700 pl-7">{faq.answer}</p>
								</div>
							))}
						</div>
						<div className="mt-10 text-center">
							<span className="inline-block bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-medium">
								Still have questions?{" "}
								<a href="/contact" className="underline">
									Contact our team
								</a>
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FAQ;
