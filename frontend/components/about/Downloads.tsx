import { Download } from "lucide-react";
const files = [
  {
    name: 'Лицензия TOO "Қаржы Ломбард"',
    href: "/files/license.pdf",
  },
  {
    name: "Договор о предоставлении микрокредита",
    href: "/files/contract.pdf",
  },
  {
    name: "Информация о порядке и сроках рассмотрения обращений",
    href: "/files/info.pdf",
  },
];

export default function Downloads() {
  return (
    <div className="flex flex-wrap gap-4 justify-center py-10">
      {files.map((file, i) => (
        <a
          key={i}
          href={file.href}
          download
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-b from-zinc-700 to-zinc-900 text-white shadow-md hover:brightness-110 transition"
        >
          <Download className="w-5 h-5" />
          <span className="text-sm text-left">{file.name}</span>
        </a>
      ))}
    </div>
  );
}
