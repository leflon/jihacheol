<script>
	const version = import.meta.env.VITE_APP_VERSION;
	const commit = import.meta.env.VITE_GIT_COMMIT_HASH;
	const buildTime = import.meta.env.VITE_BUILD_TIME;

	const githubHref = `https://github.com/leflon/metrodle`;
	const commitHref = `${githubHref}/commit/${commit}`;
</script>

<footer>
	<p><a href="https://leflon.fr">Paul Leflon</a> 제작</p>
	<hr />
	<p>{buildTime} 빌드</p>
	<p>버전: {version} | 커밋: <a href={commitHref}>{commit}</a></p>
</footer>

<style>
	footer {
		font: 12px 'Parisine';
		text-align: center;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding-top: 30px;
		padding-bottom: 15px;
	}

	p {
		margin: 2px 0;
	}
	hr {
		width: 50px;
	}

	a {
		color: inherit;
		&:hover {
			text-decoration: none;
		}
	}
</style>
