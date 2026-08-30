interface Props {
  genres: string[]
  counts: Record<string, number>
  total: number
  active: string
  onSelect: (g: string) => void
}

export default function CategoryBrowse({ genres, counts, total, active, onSelect }: Props) {
  return (
    <section className="page-section category-section">
      <h2 className="section-title">Browse by Category</h2>
      <div className="category-list">
        <button
          type="button"
          className={`category-chip${active === 'All' ? ' active' : ''}`}
          onClick={() => onSelect('All')}
        >
          <span className="cat-name">All Games</span>
          <span className="cat-count">{total}</span>
        </button>
        {genres.map((g) => (
          <button
            key={g}
            type="button"
            className={`category-chip${active === g ? ' active' : ''}`}
            onClick={() => onSelect(g)}
          >
            <span className="cat-name">{g}</span>
            <span className="cat-count">{counts[g] ?? 0}</span>
          </button>
        ))}
      </div>
    </section>
  )
}