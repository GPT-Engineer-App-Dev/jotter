import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Heading, Input, Textarea, VStack, HStack, IconButton, Select, Tag, TagLabel } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '', category: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setNotes(savedNotes);
    setCategories(savedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote({
      ...currentNote,
      [name]: value,
    });
  };

  const handleAddNote = () => {
    if (currentNote.title && currentNote.content) {
      setNotes([...notes, { ...currentNote, id: Date.now(), category: currentNote.category }]);
      setCurrentNote({ id: null, title: '', content: '', category: '' });
    }
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setIsEditing(true);
  };

  const handleUpdateNote = () => {
    setNotes(notes.map(note => (note.id === currentNote.id ? currentNote : note)));
    setCurrentNote({ id: null, title: '', content: '', category: '' });
    setIsEditing(false);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = filterCategory ? notes.filter(note => note.category === filterCategory) : notes;
  const searchedNotes = searchQuery ? filteredNotes.filter(note => note.content.toLowerCase().includes(searchQuery.toLowerCase())) : filteredNotes;

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Text Notes</Heading>
        <Box width="100%">
          <Input
            placeholder="New Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            mb={2}
          />
          <Button onClick={() => {
            if (selectedCategory && !categories.includes(selectedCategory)) {
              setCategories([...categories, selectedCategory]);
              setSelectedCategory('');
            }
          }} mb={4}>Add Category</Button>
        </Box>
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
          <Select placeholder="Select Category" onChange={(e) => setCurrentNote({
            ...currentNote,
            category: e.target.value,
          })} mb={2}>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </Select>
          {isEditing ? (
            <Button colorScheme="teal" onClick={handleUpdateNote} width="100%">Update Note</Button>
          ) : (
            <Button colorScheme="teal" onClick={handleAddNote} width="100%">Add Note</Button>
          )}
        </Box>
        <Select placeholder="Filter by Category" onChange={(e) => setFilterCategory(e.target.value)} mb={4}>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </Select>
        <Input
          placeholder="Search Notes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mb={4}
        />
        <VStack spacing={4} width="100%">
          {searchedNotes.map(note => (
            <Box key={note.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <HStack justifyContent="space-between">
                <Heading as="h3" size="md">{note.title}</Heading>
                <HStack>
                  <Tag size="md" borderRadius="full" variant="solid" colorScheme="teal">
                    <TagLabel>{note.category}</TagLabel>
                  </Tag>
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