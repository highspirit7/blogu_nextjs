export default function BlogHeader({ title, subtitle, coverImage, date }) {
  return (
    <div className="blog-detail-header">
      <p className="lead mb-2">{date}</p>
      <h1 className="blog-detail-header-title font-weight-bold  mb-3">
        {title}
      </h1>
      <h2 className="blog-detail-header-subtitle mb-3">{subtitle}</h2>

      {coverImage && (
        <img
          className="img-fluid rounded"
          src={coverImage}
          alt="TODO: provide alt"
        />
      )}
    </div>
  );
}
