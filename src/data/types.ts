export interface ImageProps {
	url: string;
	alt?: string | null;
	copyright: string | null;
	width: number;
	height: number;
	ratio: number;
}

export interface VideoLoopProps {
	url: string;
	name?: string;
}

enum HomeSectionTemplate {
	ImageTitreSousTitreInfos = "1: Image + Titre + sous-titre + infos",
	TitreSousTitreFondBlanc = "6: Titre + sous-titre sur fond blanc",
	ImageTitre = "3: Image + Titre",
	TwoColonnesTitreImage = "5: 2 colonnes Titre + Image",
}

export interface PinnedPostProps {
	position: number;
	uid?: string;
}

export interface SelectedReadProps {
	uid: string;
	title: string;
	image: ImageProps | null;
	video_loop: VideoLoopProps | null;
}

export interface HomeSectionProps {
	uid: string;
	tags: string[];
	publication_date: string;
	title: string;
	subtitle: string;
	text_color: string;
	image: ImageProps | null;
	video_loop: VideoLoopProps | null;
	template: HomeSectionTemplate;
	author: string | null;
	internal_link: {
		uid: string;
		type: string;
	} | null;
	description: string;
}

export interface HomeDataProps {
	title: string;
	description: string;
	keywords: string;
	scrolling_news: string[];
	pinned_posts: PinnedPostProps[];
	selected_reads: SelectedReadProps[];
	image: string;
	sections: HomeSectionProps[];
}

interface ParagraphProps {
	type: string;
	text: string;
	spans: any[];
}

export interface SectionGalleryProps {
	template: "section-gallery";
	article: ArticleProps;
	gallery: ImageProps[];
}

export interface SectionFullTextProps {
	template: "section-full-text";
	article: ArticleProps;
	text: ParagraphProps[];
}

export interface SectionHeroProps {
	template?: "section-hero";
	article: ArticleProps;
	title: string;
	subtitle: string | null;
	text_color?: string;
	image?: ImageProps | null;
	video_loop?: VideoLoopProps | null;
	displayCredits?: boolean;
}

interface VideoLinkProps {
	width: number;
	height: number;
	embed_url: string;
	type: string;
	version: string;
	title: string;
	author_name: string;
	author_url: string;
	provider_name: string;
	provider_url: string;
	cache_age: null;
	thumbnail_url: string;
	thumbnail_width: number;
	thumbnail_height: number;
	html: string;
}

export interface SectionVideoLauncherProps {
	template: "section-video-launcher";
	article: ArticleProps;
	display_article_title: boolean;
	text: ParagraphProps[];
	link: VideoLinkProps;
	ratio: string;
	image: null;
	disposition: "Texte | Video";
}

export interface SectionQuoteProps {
	template: "section-quote";
	article: ArticleProps;
	text: ParagraphProps[];
}

interface PlaylistItem {
	url: string;
	title: string;
}

export interface SectionPlaylistProps {
	template: "section-playlist";
	article: ArticleProps;
	playlist: PlaylistItem[];
}

export interface InternalLinkProps {
	uid: string;
	type: string;
}

export type ArticleSectionProps =
	| SectionGalleryProps
	| SectionFullTextProps
	| SectionHeroProps
	| SectionVideoLauncherProps
	| SectionQuoteProps
	| SectionPlaylistProps;

export interface ArticleProps {
	uid: string;
	tags: string[];
	publication_date: string;
	title: string;
	subtitle: string;
	text_color: string;
	image: ImageProps | null;
	video_loop: VideoLoopProps | null;
	template: HomeSectionTemplate;
	author: string;
	internal_link: InternalLinkProps | null;
	sections: ArticleSectionProps[];
	description: string;
}
