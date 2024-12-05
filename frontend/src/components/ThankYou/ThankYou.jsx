import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
	return (
		<div className="min-h-screen bg-gray-100 py-12 flex items-center justify-center">
			<div className="max-w-xl mx-auto px-4">
				<div className="bg-white rounded-lg shadow p-8 text-center">
					<div className="mb-6">
						<svg
							className="mx-auto h-12 w-12 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<h1 className="text-3xl font-semibold text-gray-900 mb-4">
						Thank You!
					</h1>
					<p className="text-lg text-gray-600 mb-8">
						Your response has been saved successfully.
					</p>
					
				</div>
			</div>
		</div>
	);
};

export default ThankYou;