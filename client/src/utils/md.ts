import ReactMarkdown from 'react-markdown';
import { stripIndent } from 'common-tags';
import React from 'react';

/**
 * Markdown renderer. This is a wrapper around the ReactMarkdown component.
 * @param strings the strings to be formatted
 * @param values the values to be inserted into the strings
 * @returns A ReactMarkdown component
 */
function md(strings: TemplateStringsArray, ...values: any[]) {
  console.log(strings, values);
  const text = stripIndent(
    strings.reduce((acc, str, i) => acc + str + (values[i] || ''), ''),
  );

  return React.createElement('div', {
    className: 'prose mx-auto',
    children: ReactMarkdown({ children: text }),
  });
}

export default md;
