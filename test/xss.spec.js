import {HTML, escape, URLProtocolFilter} from '../index.js'

describe('XSS', () => {

	const compileAndInsert = (text) => {
		const div = document.createElement("div");
		document.body.appendChild(div);
		div.innerHTML = text;
		return div;
	}
	
	
	describe('script tag', () => {
		
		const value = `<script> evil script here...</script>`;
		
		it('simple template should pass script tag', () => {
			const template = `<a>${value}</a>`;
			const div = compileAndInsert(template);
			expect(div.querySelector("script")).not.toBe(null);
		});

		it('HTML template should not pass script tag', () => {
			const template = HTML `<a>${value}</a>`;
			const div = compileAndInsert(template);
			expect(div.querySelector("script")).toBe(null);
		});
	});
	
	describe('pass only text', () => {
		
		const value = `<b>bad tag</b>`;
		
		it('simple template should pass html', () => {
			const template = `<a>${value}</a>`;
			const div = compileAndInsert(template);
			const anchor = div.querySelector("a");
			expect(anchor.childNodes.length).toBe(1);
			const node = anchor.childNodes.item(0);
			expect(node.nodeType).toBe(Node.ELEMENT_NODE);
		});
		
		it('HTML template should pass text only', () => {
			const template = HTML `<a>${value}</a>`;
			const div = compileAndInsert(template);
			const anchor = div.querySelector("a");
			expect(anchor.childNodes.length).toBe(1);
			const node = anchor.childNodes.item(0);
			expect(node.nodeType).toBe(Node.TEXT_NODE);
			expect(node.textContent).toBe(value);
		});
	});
	
	describe('safe attributes', () => {
		
		const value = `post" onclick="alert('XSS')`;
		
		it('simple template should break attributes', () => {
			const template = `<form method="${value}"></form>`;
			const div = compileAndInsert(template);
			const form = div.querySelector("form");
			expect(form.getAttribute("onclick")).not.toBe(null);
		});
		
		it('HTML template should safe attributes', () => {
			const template = HTML `<form method="${value}"></form>`;
			const div = compileAndInsert(template);
			const form = div.querySelector("form");
			expect(form.getAttribute("method")).toBe(value);
			expect(form.getAttribute("onclick")).toBe(null);
		});
	
	});
	
	describe('protocol filter', () => {
		
		const badURL = `javascript:window.open();`;
		const goodURL = `http://google.ru`;
		const filterURL = new URLProtocolFilter("http", "https", "ftp", "mailto");
		
		it('simple template should pass js', () => {
			const template = `<a href="${badURL}"></a>`;
			const div = compileAndInsert(template);
			const anchor = div.querySelector("a");
			expect(anchor.getAttribute("href")).toBe(badURL);
		});
		
		it('HTML template should filter js', () => {
			const template = HTML `<a href="${filterURL(badURL,"")}"></a>`;
			const div = compileAndInsert(template);
			const anchor = div.querySelector("a");
			expect(anchor.getAttribute("href")).toBe("");
		});
		
		it('HTML template should pass http', () => {
			const template = HTML `<a href="${filterURL(goodURL,"")}"></a>`;
			const div = compileAndInsert(template);
			const anchor = div.querySelector("a");
			expect(anchor.getAttribute("href")).toBe(goodURL);
		});
	
	});
	
	describe('value escape filter', () => {
		
		const badValue = `'); doXss('xss'); void('`;
		
		it('simple template should break value', () => {
			let clickValue, xssValue;
			window.passClick = v => clickValue = v;
			window.doXss = v => xssValue = v;
			const template = `<a onclick="passClick('${badValue}')"></a>`;
			const div = compileAndInsert(template);
			const anchor = div.querySelector("a");
			anchor.click();
			expect(xssValue).toBe('xss');
		});
		
		it('HTML template should escape value', () => {
			let clickValue, xssValue;
			window.passClick = v => clickValue = v;
			window.doXss = v => xssValue = v;
			const template = HTML `<a onclick="passClick(${escape(badValue)})"></a>`;
			const div = compileAndInsert(template);
			const anchor = div.querySelector("a");
			anchor.click();
			expect(xssValue).toBe(undefined);
			expect(clickValue).toBe(badValue);
		});
	
	});
	
});