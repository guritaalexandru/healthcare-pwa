import React, {useContext} from 'react';

import GeneralLayout from "@/js/Components/Layout/GeneralLayout";
import {ArticleContext} from "@/pages/article/[id]";
import {extractHeadersWithAnchors, generateTocWithAnchors, markdownToHtml} from "@/js/utils/markdown";

export default function ArticlePage(props){
	const article = useContext(ArticleContext);
	const articleContent = article.content;

	const contentHtml = markdownToHtml(articleContent);

	const headers = extractHeadersWithAnchors(articleContent);
	const toc = generateTocWithAnchors(headers);

	const tocHtml = markdownToHtml(toc);

	return (
		<GeneralLayout>
			<div id={'ArticlePage'}>
				<div>
					<div className={'content-container'}>
						<h1 className={'text-5xl text-center mb-20 mt-10'}>
							Article name
						</h1>
					</div>
					<div className={'content-container'}>
						<div dangerouslySetInnerHTML={{__html: tocHtml}}/>
						<div dangerouslySetInnerHTML={{__html: contentHtml}}/>
					</div>
				</div>
			</div>
		</GeneralLayout>
	)
}
