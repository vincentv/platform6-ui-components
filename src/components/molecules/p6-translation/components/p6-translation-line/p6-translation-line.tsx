import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from "@stencil/core";
import { isCustomEvent, ValidEventDetail } from "~shared/form/event";
import { Mode, Size } from "~shared/types";
import { isDefaultLanguage, LanguageCode } from "~utils/language";
import { getL10n, L10n } from "~utils/translations";

@Component({
  tag: "p6-translation-line",
  styleUrl: "p6-translation-line.scss",
  assetsDirs: ["locales"],
  shadow: true,
})
export class P6TranslationLine implements ComponentInterface {
  /**
   * The name
   */
  @Prop() name!: string;

  /**
   * The current translation
   */
  @Prop() public excludes: LanguageCode[] = [];

  /**
   * The language
   */
  @Prop() public language!: LanguageCode;

  /**
   * The translation
   */
  @Prop() public translation!: string;

  /**
   * The size
   */
  @Prop() public size!: Size;

  /**
   * Read only
   */
  @Prop({ attribute: "readOnly" }) public readOnly!: boolean;

  /**
   * Disabled
   */
  @Prop() disabled!: boolean;

  /**
   *
   */
  @Event() p6Delete!: EventEmitter<void>;

  /**
   *
   */
  @Event() p6KeyChange!: EventEmitter<ValidEventDetail<LanguageCode>>;

  /**
   *
   */
  @Event() p6ValueChange!: EventEmitter<ValidEventDetail<string>>;

  @Element() host!: HTMLP6TranslationLineElement;

  private l10n: L10n | undefined;

  async componentWillLoad(): Promise<void> {
    this.l10n = await getL10n(this.host);
  }

  render(): JSX.Element {
    const isDefault = isDefaultLanguage(this.language);

    return (
      <Host>
        <div class="columns is-variable is-1">
          <div class="column">
            <div class="field has-addons">
              {isDefault || this.readOnly || this.disabled ? null : (
                <p6-action
                  onClick={this.deleteHandler}
                  mode={Mode.danger}
                  size={this.size}
                  class={{
                    "has-tooltip-arrow": true,
                    [`has-tooltip-right`]: true,
                  }}
                  data-tooltip={this.l10n?.deleteTooltip}
                >
                  <p6-icon name="trash" size={this.size} />
                </p6-action>
              )}
              <div class="control is-expanded">
                <p6-language
                  name={`${this.name}-${this.language}-lang`}
                  value={this.language}
                  size={this.size}
                  disabled={this.disabled || isDefault}
                  excludes={this.excludes}
                  required
                  onP6Change={this.languageChangeHandler}
                />
              </div>
            </div>
          </div>
          <div class="column">
            <p6-textarea
              name={`${this.name}-${this.language}-value`}
              value={this.translation}
              rows={2}
              size={this.size}
              readOnly={this.readOnly}
              disabled={this.disabled}
              required
              onChange={this.translationChangeHandler}
            />
          </div>
        </div>
      </Host>
    );
  }

  private languageChangeHandler = (event: Event): void => {
    if (!isCustomEvent(event)) {
      return;
    }

    event.stopPropagation();
    this.p6KeyChange.emit({
      name: "key",
      value: event.detail.value,
    });
  };

  private translationChangeHandler = (event: Event): void => {
    event.stopPropagation();
    this.p6ValueChange.emit({
      name: "value",
      value: (event.target as HTMLTextAreaElement).value,
    });
  };

  private deleteHandler = (event: Event): void => {
    event.stopPropagation();
    this.p6Delete.emit();
  };
}
