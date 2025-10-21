import React from "react";
import { Calendar } from "lucide-react";
type Props = {
  title?: string;
  linkHref?: string;
  linkText?: string;
  className?: string;
};

const scoped = `
.ve-scope.card{display:flex;flex-direction:column}

.ve-scope .ve-content{padding:48px 24px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:12px;flex:1}
.ve-scope .ve-icon{color:#9AA0A6;display:block;width:56px;height:56px}
.ve-scope .ve-lead{font-family:var(--font-heading);font-weight:700;font-size:20px;letter-spacing:-.01em}
.ve-scope .ve-link{color:#007AFF;text-decoration:none;transition:color .15s ease}
.ve-scope .ve-link:visited{color:#007AFF}
.ve-scope .ve-link:hover{color:#005FCC;text-decoration:none}
`;

export const NextVisitsEmptyCard: React.FC<Props> = ({
  title = "Последующие визиты на сегодня",
  linkHref = "/work",
  linkText = "Работа",
  className
}) => {
  return (
    <div className={`ve-scope card ${className ?? ""}`}>
      <style dangerouslySetInnerHTML={{__html: scoped}} />
      <div className="card-header">{title}</div>
      <div className="card-content ve-content">
        <Calendar className="ve-icon" size={56} strokeWidth={1.25} />
        
        <div className="ve-lead">На сегодня визиты не запланированы</div>
        <p className="small">Перейдите в раздел <a className="ve-link" href={linkHref}>{linkText}</a>, чтобы добавить записи</p>
      </div>
    </div>
  );
};
