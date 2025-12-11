import path from 'path';
import concurrently from 'concurrently'

concurrently([
	{
		name: 'server',
		command: "bun run dev",
		cwd: path.resolve( __dirname, 'packages/server' ),
		prefixColor: 'cyan'
    },
	{
		name: 'client',
		command: "bun run dev",
		cwd: path.resolve( __dirname, 'packages/client' ),
		prefixColor: 'magenta'
	}
])