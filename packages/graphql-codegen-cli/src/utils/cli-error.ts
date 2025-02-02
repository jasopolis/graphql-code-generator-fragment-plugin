import { DetailedError } from '@graphql-codegen/plugin-helpers';

type CompositeError = Error | DetailedError;
type ListrError = Error & { errors: CompositeError[] };
export function isListrError(err: Error & { name?: unknown; errors?: unknown }): err is ListrError {
  return err.name === 'ListrError' && Array.isArray(err.errors) && err.errors.length > 0;
}

export function cliError(err: any, exitOnError = true) {
  let msg: string;

  if (err instanceof Error) {
    msg = err.message || err.toString();
  } else if (typeof err === 'string') {
    msg = err;
  } else {
    msg = JSON.stringify(err);
  }

  // eslint-disable-next-line no-console
  console.error(msg);

  if (exitOnError) {
    process.exit(1);
  }
}
