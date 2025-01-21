interface SubtitlePlaceholderProps {
  subtitleName: string;
}

const SubtitlePlaceholder: React.FC<SubtitlePlaceholderProps> = ({
  subtitleName,
}) => {
  return (
    <div className="uploaded-subtitle-container">
      <img
        src="../../../public/images/srt-icon.png"
        alt="uploaded subtitle icon"
        className="uploaded-subtitle-container__icon"
      />
      <p>{subtitleName}</p>
    </div>
  );
};

export default SubtitlePlaceholder;
