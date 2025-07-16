import { Component } from '@angular/core';
import { PenIconComponent } from '../Icons/pen-icon/pen-icon.component';
import { TIconComponent } from '../Icons/t-icon/t-icon.component';
import { CommonModule } from '@angular/common';
import { TickIconComponent } from '../Icons/tick-icon/tick-icon.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  imports: [
    PenIconComponent,
    TickIconComponent,
    TIconComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  title: string = '';

  get letterCount(): number {
    return this.title.length;
  }

  onTitleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.title = value.slice(0, 55);
  }

  content: string = '';

  autoResize(textArea: HTMLTextAreaElement) {
    textArea.style.height = 'auto'; // reset first
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  categoryList = [
    {
      name: 'Business',
      icon: '💼',
      color: 'bg-[#E0F7FA] dark:bg-[#004D4D60]',
      hover: 'hover:bg-[#E8FBFD] dark:hover:bg-[#004D4D80]',
    },
    {
      name: 'Health',
      icon: '🏥',
      color: 'bg-[#FFFBEA] dark:bg-[#4E342E60]',
      hover: 'hover:bg-[#FFF8E1] dark:hover:bg-[#4E342E80]',
    },
    {
      name: 'Lifestyle',
      icon: '🌟',
      color: 'bg-[#FDECF1] dark:bg-[#880E4F60]',
      hover: 'hover:bg-[#FCE4EC] dark:hover:bg-[#880E4F80]',
    },
    {
      name: 'Technology',
      icon: '💻',
      color: 'bg-[#F1FBF2] dark:bg-[#1B5E2060]',
      hover: 'hover:bg-[#E8F5E9] dark:hover:bg-[#1B5E2080]',
    },
    {
      name: 'Sports',
      icon: '⚽',
      color: 'bg-[#EDF7FE] dark:bg-[#0D47A160]',
      hover: 'hover:bg-[#E3F2FD] dark:hover:bg-[#0D47A180]',
    },
    {
      name: 'Education',
      icon: '📚',
      color: 'bg-[#F8F0FB] dark:bg-[#4A148C60]',
      hover: 'hover:bg-[#F3E5F5] dark:hover:bg-[#4A148C80]',
    },
    {
      name: 'Food',
      icon: '🍳',
      color: 'bg-[#F7FBEC] dark:bg-[#33691E60]',
      hover: 'hover:bg-[#F1F8E9] dark:hover:bg-[#33691E80]',
    },
    {
      name: 'Entertainment',
      icon: '🎭',
      color: 'bg-[#FFF9F0] dark:bg-[#E6510060]',
      hover: 'hover:bg-[#FFF3E0] dark:hover:bg-[#E6510080]',
    },
    {
      name: 'Travel',
      icon: '✈️',
      color: 'bg-[#F2F0FA] dark:bg-[#1A237E60]',
      hover: 'hover:bg-[#EDE7F6] dark:hover:bg-[#1A237E80]',
    },
    {
      name: 'Finance',
      icon: '💰',
      color: 'bg-[#FFF9DB] dark:bg-[#8D6E6360]', // Pale gold / Dark tan
      hover: 'hover:bg-[#FFF4BF] dark:hover:bg-[#8D6E6380]',
    },
    {
      name: 'Fitness',
      icon: '🏋️‍♂️',
      color: 'bg-[#FFEFEA] dark:bg-[#BF360C60]', // Bright coral / Strong burnt orange
      hover: 'hover:bg-[#FFE3DB] dark:hover:bg-[#BF360C80]',
    },
    {
      name: 'Environment',
      icon: '🌱',
      color: 'bg-[#F6FBEA] dark:bg-[#3E4C1F60]', // Pale olive / Earth green
      hover: 'hover:bg-[#EEF7D5] dark:hover:bg-[#3E4C1F80]',
    },
    {
      name: 'General',
      icon: '📝',
      color: 'bg-[#E0E0E0] dark:bg-[#2A2E3280]',
      hover: 'hover:bg-[#D1D1D1] dark:hover:bg-[#2A2E32]',
    },
  ];

  selected = {
    name: 'General',
    icon: '📝',
    color: 'bg-[#E0E0E0] dark:bg-[#2A2E32]',
  };
  selectedClick(category: { name: string; icon: string; color: string }) {
    this.selected = category;
  }
}
