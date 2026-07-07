const TICA_SHIELD_SRC = 'https://github.com/user-attachments/assets/84997f44-2c75-406f-a7f5-c85bbe35a01f'

type TicaShieldProps = {
  alt?: string
  className?: string
  imageClassName?: string
  title?: string
  titleClassName?: string
  caption?: string
  captionClassName?: string
}

export function TicaShield({
  alt = 'TICA Trusted Buying AI shield',
  className = '',
  imageClassName = '',
  title,
  titleClassName = '',
  caption,
  captionClassName = '',
}: TicaShieldProps) {
  return (
    <div className={className}>
      <img
        src={TICA_SHIELD_SRC}
        alt={alt}
        className={imageClassName}
        decoding="async"
      />
      {title ? <p className={titleClassName}>{title}</p> : null}
      {caption ? <p className={captionClassName}>{caption}</p> : null}
    </div>
  )
}
