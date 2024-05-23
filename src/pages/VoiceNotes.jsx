import React, { useState, useRef } from 'react';
import { Box, Button, Container, Heading, VStack, HStack, IconButton, List, ListItem, Text, Input, Select, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import { FaTrash, FaMicrophone, FaPlay } from 'react-icons/fa';

const VoiceNotes = () => {
  const [voiceNotes, setVoiceNotes] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartRecording = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setVoiceNotes([...voiceNotes, { id: Date.now(), url: audioUrl, category: selectedCategory }]);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleDeleteVoiceNote = (id) => {
    setVoiceNotes(voiceNotes.filter(note => note.id !== id));
  };

  const filteredVoiceNotes = filterCategory ? voiceNotes.filter(note => note.category === filterCategory) : voiceNotes;

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Voice Notes</Heading>
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
        <Select placeholder="Filter by Category" onChange={(e) => setFilterCategory(e.target.value)} mb={4}>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </Select>
        <Box width="100%">
          <HStack justifyContent="center" mb={4}>
            <Button
              colorScheme={isRecording ? "red" : "teal"}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              leftIcon={isRecording ? <FaMicrophone /> : <FaMicrophone />}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
          </HStack>
        </Box>
        <List spacing={3} width="100%">
          {filteredVoiceNotes.map(note => (
            <ListItem key={note.id} p={4} borderWidth="1px" borderRadius="md">
              <HStack justifyContent="space-between">
                <Text>Voice Note {new Date(note.id).toLocaleString()}</Text>
                <HStack>
                  <Tag size="md" borderRadius="full" variant="solid" colorScheme="teal">
                    <TagLabel>{note.category}</TagLabel>
                  </Tag>
                  <IconButton icon={<FaPlay />} onClick={() => new Audio(note.url).play()} />
                  <IconButton icon={<FaTrash />} onClick={() => handleDeleteVoiceNote(note.id)} />
                </HStack>
              </HStack>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default VoiceNotes;