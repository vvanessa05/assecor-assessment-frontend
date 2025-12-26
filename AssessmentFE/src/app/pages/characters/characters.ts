import { Component, computed, OnInit } from '@angular/core';
import { ItemData } from 'src/app/models/card-data';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { Character } from 'src/app/services/character.service';
import { DialogService } from 'src/app/services/dialog-service';
import { MatIcon } from "@angular/material/icon";
import { Card } from "src/app/components/card/card";
import { RouterModule } from "@angular/router";
import { InputValueType } from 'src/app/utils/enums';
import { DialogData } from 'src/app/models/dialog-data';
import { colors, gender } from 'src/app/utils/constants';

@Component({
  selector: 'app-characters',
  imports: [MatIcon, Card, RouterModule],
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
})

/**
 * Component to manage the characters
 */
export class Characters implements OnInit {
  items = computed<ItemData[]>(() => {
    const charachters = this.characterService.allCharacters();

    return charachters.map((charachter) =>({
      id: charachter.id ?? "",
      picture: charachter.picture,
      title: charachter.name,
      texts: [
        {
          label: "CHARACTERS.HEIGHT",
          content: charachter.height,
        },
        {
          label: "CHARACTERS.WEIGHT",
          content: charachter.mass,
        },
        {
          label: "CHARACTERS.HAIR_COLOUR",
          content: charachter.hairColor,
        }
      ]
    }))

  })

    dialogData: DialogData = {
      header: "CHARACTERS.ACTIONS.ADD",
      submitIcon: "check",
      submitLabel: "CHARACTERS.ACTIONS.ADD",
      fields: [
        {
          key: "name",
          label: "CHARACTERS.FIELDS.NAME.LABEL",
          placeholder: "CHARACTERS.FIELDS.NAME.PLACEHOLDER",
          required: true,
          type: InputValueType.Text,
          errorText: "GENERAL_TEXTS.REQUIRED_INVALID",
        },
        {
          key: "height",
          label: "CHARACTERS.FIELDS.HEIGHT.LABEL",
          placeholder: "CHARACTERS.FIELDS.HEIGHT.PLACEHOLDER",
          required: false,
          type: InputValueType.Number,
        },
         {
          key: "weight",
          label: "CHARACTERS.FIELDS.WEIGHT.LABEL",
          placeholder: "CHARACTERS.FIELDS.WEIGHT.PLACEHOLDER",
          required: false,
          type: InputValueType.Number,
        },
        {
          key: "hairColor",
          label: "CHARACTERS.FIELDS.HAIR_COLOUR.LABEL",
          placeholder: "",
          options: colors,
          required: false,
          type: InputValueType.Selection,
        },
        {
          key: "eyesColor",
          label: "CHARACTERS.FIELDS.EYES_COLOUR.LABEL",
          placeholder: "",
          options: colors,
          required: false,
          type: InputValueType.Selection,
        },
        {
          key: "birthDate",
          label: "CHARACTERS.FIELDS.BIRTH_YEAR.LABEL",
          placeholder: "",
          required: false,
          type: InputValueType.Date,
        },
        {
          key: "gender",
          label: "CHARACTERS.FIELDS.GENDER.LABEL",
          placeholder: "",
          required: false,
          options: gender,
          type: InputValueType.Selection,
        },
      ],
    };

  constructor(
    private characterService: Character,
    readonly applicationStateService: ApplicationStateService,
    private dialogService: DialogService ) {}

    /**
     * Init the characters
     */
    ngOnInit(): void {
      if(!this.characterService.allCharacters().length) {
        this.characterService.getAll();
      }
    }

    /**
     * Open the dialog to add a new character
     */
    openAddCharacterDialog() {
      this.dialogService.openDialog(this.dialogData);
    }

}
