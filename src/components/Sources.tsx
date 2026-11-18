import { AlertCircle, BookOpen, ExternalLink } from 'lucide-react';
import { BIBLIOGRAPHY, LIMITATIONS } from '../data';
import { RevealSection } from './RevealSection';

export function Sources() {
  return (
    <RevealSection
      id="pustaka"
      className="py-14 sm:py-16 bg-white border-b border-[#E9EDF5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-wide text-[#5A6275]">
            Bagian 10 · Transparansi Data &amp; Referensi
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1F2A44] text-balance">
            Daftar Pustaka dan Batasan Studi
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5A6275] leading-relaxed">
            Seluruh parameter awal pada dasbor ini merujuk pada literatur ilmiah terpublikasi dan dokumen regulasi resmi tanpa angka rekaan.
          </p>
        </div>

        {/* Kotak Batasan */}
        <div className="rounded-xl border-2 border-dashed border-[#B23A3A]/50 bg-[#FFF6DC]/55 p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1F2A44] mb-3">
            <AlertCircle className="w-4 h-4 text-[#B23A3A]" aria-hidden="true" />
            <span>Batasan Data dan Asumsi Model</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-[#1F2A44] leading-relaxed list-disc pl-5">
            {LIMITATIONS.map((lim) => (
              <li key={lim}>{lim}</li>
            ))}
          </ul>
        </div>

        {/* Daftar Pustaka Gaya APA */}
        <div className="rounded-xl border border-[#E9EDF5] bg-white overflow-hidden">
          <div className="bg-[#1F2A44] px-5 py-3.5 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#C9A227]" aria-hidden="true" />
            <h3 className="text-base font-bold text-white">
              Daftar Pustaka (Gaya APA)
            </h3>
          </div>

          <ol className="divide-y divide-[#E9EDF5] p-5 space-y-3 list-decimal list-inside">
            {BIBLIOGRAPHY.map((entry) => (
              <li
                key={entry.id}
                className="pt-3 first:pt-0 text-xs sm:text-sm text-[#1F2A44] leading-relaxed"
              >
                <span>{entry.sitasi}</span>{' '}
                {entry.doi && (
                  <a
                    href={`https://doi.org/${entry.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#1F2A44] underline decoration-[#C9A227] underline-offset-2 hover:text-[#2E7D4F]"
                  >
                    doi:{entry.doi}
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </RevealSection>
  );
}
