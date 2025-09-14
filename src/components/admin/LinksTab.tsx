import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { TouchSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import { PageData, Link } from '../../types';
import LinkItem from './LinkItem';
import EditLinkModal from './EditLinkModal';
import { Plus } from 'lucide-react';

interface LinksTabProps {
  data: PageData;
  setData: React.Dispatch<React.SetStateAction<PageData | null>>;
}

const LinksTab: React.FC<LinksTabProps> = ({ data, setData }) => {
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Configure sensors for better mobile support
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  
  const sensors = useSensors(mouseSensor, touchSensor);
  const handleAddLink = () => {
    if (!data) return;
    const newLink: Link = {
      id: uuidv4(),
      type: 'standardLink',
      title: 'New Link',
      url: 'https://wisefossi.com',
      order: data.links.length,
      active: true,
      thumbnailUrl: '',
    };
    setData(prev => prev ? { ...prev, links: [...prev.links, newLink] } : null);
  };

  const handleOpenEditModal = (link: Link) => {
    setEditingLink(link);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLink(null);
  };

  const handleSaveLink = (updatedLink: Link) => {
    setData(prev => {
      if (!prev) return null;
      const newLinks = prev.links.map(l => l.id === updatedLink.id ? updatedLink : l);
      return { ...prev, links: newLinks };
    });
    handleCloseModal();
  };

  const handleToggleActive = (id: string, active: boolean) => {
    console.log('Toggling link active state:', id, active);
    setData(prev => {
      if (!prev) return null;
      const newLinks = prev.links.map(l => l.id === id ? { ...l, active } : l);
      console.log('Updated links:', newLinks.find(l => l.id === id));
      return { ...prev, links: newLinks };
    });
  };
  const handleDeleteLink = (id: string) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
        setData(prev => prev ? { ...prev, links: prev.links.filter(l => l.id !== id) } : null);
    }
  };
  
  const handleDuplicateLink = (linkToDuplicate: Link) => {
    if (!data) return;
    
    // Find the position of the original link
    const originalIndex = data.links.findIndex(l => l.id === linkToDuplicate.id);
    
    // Create the duplicated link
    const duplicatedLink: Link = {
      ...linkToDuplicate,
      id: uuidv4(),
      title: `${linkToDuplicate.title} (Copy)`,
      order: linkToDuplicate.order + 0.5, // Place it right after the original
    };
    
    setData(prev => {
      if (!prev) return null;
      
      // Insert the duplicated link right after the original
      const newLinks = [...prev.links];
      newLinks.splice(originalIndex + 1, 0, duplicatedLink);
      
      // Reorder all links to maintain proper sequence
      const reorderedLinks = newLinks.map((link, index) => ({ ...link, order: index }));
      
      return { ...prev, links: reorderedLinks };
    });
  };

  const handleMoveUp = (id: string) => {
    setData(prev => {
      if (!prev) return null;
      const sortedLinks = [...prev.links].sort((a, b) => a.order - b.order);
      const currentIndex = sortedLinks.findIndex(l => l.id === id);
      if (currentIndex > 0) {
        const reorderedLinks = arrayMove(sortedLinks, currentIndex, currentIndex - 1);
        const finalLinks = reorderedLinks.map((link, index) => ({ ...link, order: index }));
        return { ...prev, links: finalLinks };
      }
      return prev;
    });
  };

  const handleMoveDown = (id: string) => {
    setData(prev => {
      if (!prev) return null;
      const sortedLinks = [...prev.links].sort((a, b) => a.order - b.order);
      const currentIndex = sortedLinks.findIndex(l => l.id === id);
      if (currentIndex < sortedLinks.length - 1) {
        const reorderedLinks = arrayMove(sortedLinks, currentIndex, currentIndex + 1);
        const finalLinks = reorderedLinks.map((link, index) => ({ ...link, order: index }));
        return { ...prev, links: finalLinks };
      }
      return prev;
    });
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setData(prev => {
        if (!prev) return null;
        const oldIndex = prev.links.findIndex(l => l.id === active.id);
        const newIndex = prev.links.findIndex(l => l.id === over.id);
        const reorderedLinks = arrayMove(prev.links, oldIndex, newIndex);
        const finalLinks = reorderedLinks.map((link, index) => ({ ...link, order: index }));
        return { ...prev, links: finalLinks };
      });
    }
  };

  const sortedLinks = data.links.sort((a, b) => a.order - b.order);
  
  console.log('LinksTab data:', data);
  console.log('Sorted links:', sortedLinks);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Links & Content</h3>
        <button 
          onClick={handleAddLink} 
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} className="mr-1" />
          Add Link
        </button>
      </div>

      <DndContext 
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={data.links.map(l => l.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {sortedLinks.map((link, index) => (
              <LinkItem 
                key={link.id} 
                link={link} 
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteLink}
                onDuplicate={handleDuplicateLink}
                onToggleActive={handleToggleActive}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                canMoveUp={index > 0}
                canMoveDown={index < sortedLinks.length - 1}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {data.links.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-gray-500 mb-4">No links created yet</div>
          <button
            onClick={handleAddLink}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first link
          </button>
        </div>
      )}
      
      {data.links.length > 0 && sortedLinks.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-gray-500 mb-4">All links are hidden or filtered</div>
        </div>
      )}

      <EditLinkModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        link={editingLink}
        onSave={handleSaveLink}
      />
    </div>
  );
};

export default LinksTab;