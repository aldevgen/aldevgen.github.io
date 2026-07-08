module FormationLinks
  class FormationLinkGenerator < Jekyll::Generator
    safe true
    priority :high

    def generate(site)
      coll = site.collections['formations']
      return unless coll && coll.docs

      coll.docs.each do |doc|
        # Split path with both Unix and Windows separators and remove empty segments
        path_parts = doc.relative_path.split(%r{[\\/]}).map(&:to_s).reject(&:empty?)

        # Fallback: use File::SEPARATOR split if above didn't work
        if path_parts.empty?
          path_parts = doc.relative_path.split(File::SEPARATOR).reject(&:empty?)
        end

        next unless path_parts.first == '_formations' && path_parts.length >= 2

        filename = path_parts.last
        importance = (filename[/^(\d+)_/, 1] || '0').to_i
        raw_lesson = filename.gsub(/^\d+_/, '').gsub(/\.md$/i, '')

        doc.data['importance'] = importance

        # Build permalink from directory segments after _formations
        dirs = path_parts[1..-2] || []
        # Slugify each segment for URL-friendliness
        slugged_dirs = dirs.map { |s| Jekyll::Utils.slugify(s) }
        lesson_slug = Jekyll::Utils.slugify(raw_lesson)
        segments = slugged_dirs + [lesson_slug]

        permalink = File.join('/formations', *segments, '')
        # Ensure permalink uses forward slashes
        permalink = permalink.gsub(File::SEPARATOR, '/')

        # Set permalink and slug on doc
        doc.data['permalink'] = permalink
        doc.data['slug'] = lesson_slug

        Jekyll.logger.info "FormationLinks:", "#{doc.relative_path} -> #{permalink}"
      end
    end
  end
end
