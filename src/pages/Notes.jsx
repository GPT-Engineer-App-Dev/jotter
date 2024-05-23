import React, { useState } from 'react';
import { Box, Button, Container, Heading, Input, Textarea, VStack, HStack, IconButton } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote({
      ...currentNote,
      [name]: value,
    });
  };

  const handleAddNote = () => {
    if (currentNote.title && currentNote.content) {
      setNotes([...notes, { ...currentNote, id: Date.now() }]);
      setCurrentNote({ id: null, title: '', content: '' });
    }
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setIsEditing(true);
  };

  const handleUpdateNote = () => {
    setNotes(notes.map(note => (note.id === currentNote.id ? currentNote : note)));
    setCurrentNote({ id: null, title: '', content: '' });
    setIsEditing(false);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Text Notes</Heading>
        <Box width="100%">
          <Input
            placeholder="Title"
            name="title"
            value={currentNote.title}
            onChange={handleInputChange}
            mb={2}
          />
          <Textarea
            placeholder="Content"
            name="content"
            value={currentNote.content}
            onChange={handleInputChange}
            mb={2}
          />
          {isEditing ? (
            <Button colorScheme="teal" onClick={handleUpdateNote} width="100%">Update Note</Button>
          ) : (
            <Button colorScheme="teal" onClick={handleAddNote} width="100%">Add Note</Button>
          )}
        </Box>
        <VStack spacing={4} width="100%">
          {notes.map(note => (
            <Box key={note.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <HStack justifyContent="space-between">
                <Heading as="h3" size="md">{note.title}</Heading>
                <HStack>
                  <IconButton icon={<FaEdit />} onClick={() => handleEditNote(note)} />
                  <IconButton icon={<FaTrash />} onClick={() => handleDeleteNote(note.id)} />
                </HStack>
              </HStack>
              <Box mt={2}>{note.content}</Box>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Notes;