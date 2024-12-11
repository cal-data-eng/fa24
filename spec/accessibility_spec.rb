# frozen_string_literal: true

# Run accessibility specs for all pages in the webiste.
# This runs the axe accessibility checker on each page in a headless browser.

# spec_helper ensures the webiste is built and can be served locally
require 'spec_helper'

# Axe-core test standards groups
# See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#axe-core-tags
# Tests are segmented in 2.0, 2.1 and 2.2+
# In most places WCAG 2.1AA is the minimum requirement, but 2.2 is the current WCAG Standard.
required_a11y_standards = %i[wcag2a wcag2aa wcag21a wcag21aa]
complete_a11y_standards = %i[wcag22aa best-practice secion508]

# axe-core rules that are not required to be accessible / do not apply
# You may temporarily want to add rules here during development.
# See: https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
skipped_rules = []
# These are elements that are not required to be accessible
# It should be rare to add to this list. This disables all rules for an element.
# e.g. <img data-a11y-errors="true" src="..." /> would pass even though it's missing alt text.
excluded_elements = [
  '[data-a11y-errors="true"]',
  # Jupyternotebooks from nbconvert
  '[data-jp-theme-light="true"]',
]

# We must call this to ensure the build it up-to-date.
build_jekyll_site!
ALL_PAGES = load_sitemap
puts "Running tests on #{ALL_PAGES.count} pages."
puts "  - #{ALL_PAGES.join("\n  - ")}\n\n"

RSpec.shared_examples 'a11y tests' do
  it 'meets WCAG 2.1' do
    expect(page).to be_axe_clean
      .according_to(*required_a11y_standards)
      .skipping(*skipped_rules)
      .excluding(*excluded_elements)
  end

  it 'meets WCAG 2.2' do
    expect(page).to be_axe_clean
      .according_to(*complete_a11y_standards)
      .skipping(*skipped_rules)
      .excluding(*excluded_elements)
  end
end

ALL_PAGES.each do |path|
  if path.match(/assets\/lectures\/(lec\d\d\/)?lec\d\d(-.*)?\.html/)
    describe "Jupyter Notebook Exports" do
      skip "skipping likely notebook file @ #{path}"
    end
    next
  end

  describe "#{path} is accessible", :js, type: :feature do
    context 'when light mode', path_to_sym(path) do
      before do
        visit(path)
        page.execute_script('typeof jtd != "undefined" && jtd.setTheme("light")')
      end

      include_context 'a11y tests'
    end

    context 'when dark mode', path_to_sym(path) do
      before do
        visit(path)
        page.execute_script('typeof jtd != "undefined" && jtd.setTheme("dark")')
      end

      include_context 'a11y tests'
    end
  end
end
