import styles from "./ExternalLinkIcon.module.css";

const ExternalLinkIcon = () => {
	return (
		<span className={styles.externalLink__outer}>
			<div className={styles.externalLink__inner}></div>
		</span>
	);
};

export default ExternalLinkIcon;
