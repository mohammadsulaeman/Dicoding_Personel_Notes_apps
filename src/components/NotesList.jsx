import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, searchKeyword, dataTestId = 'notes-list' }) {
  const hasNotes = notes.length > 0;

  const groupedNotes = notes.reduce((groups, note) => {
    const date = new Date(note.createdAt);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }

    groups[monthYear].push(note);
    return groups;
  }, {});

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p className="notes-list__empty-message" data-testid={`${dataTestId}-empty`}>
          Tidak ada catatan
        </p>
      </div>
    );
  }

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {Object.entries(groupedNotes).map(([groupKey, groupNotes]) => (
        <section
          key={groupKey}
          className="notes-group"
          data-testid={`${groupKey}-group`}
        >
          <h3>{groupKey}</h3>

          <span data-testid={`${groupKey}-group-count`}>
            {groupNotes.length} catatan
          </span>

          {groupNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={onDelete}
              onArchive={onArchive}
              searchKeyword={searchKeyword}
            />
          ))}
        </section>
      ))}
    </div>
  );
}

export default NotesList;